import React from 'react';
import { connect } from 'react-redux';

import {
  fetchToday,
} from '../actions/DailyActions';

import DailyScrumPage from '../components/DailyScrumPage';

class DailyScrumApp extends React.Component {
  constructor(props) {
    super(props);
    console.log('DailyScrumApp props', props);
  }

  componentDidMount() {
    const { match: { params: { scrumId } } } = this.props;
    const { fetchToday } = this.props;
    fetchToday(scrumId);
  }

  render() {
    let { today } = this.props;
    // console.log('DailyScrumApp render today', today);
    return (
      <DailyScrumPage
        today={ today }
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchToday: id => dispatch(fetchToday(id)),
  };
}

function mapStateToProps(state) {
  // console.log('DailyScrumApp mapStateToProps state', state);
  return state.scrum;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyScrumApp);
