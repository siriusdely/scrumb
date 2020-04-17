import React from 'react';
import { connect } from 'react-redux';

import {
  fetchToday,
} from '../actions/DailyActions'

import { Container
       , Dimmer
       , Header
       , Icon
       , Loader } from 'semantic-ui-react';

import DailyNavigationBar from './DailyNavigationBar';
import UserTasksBoard from './UserTasksBoard';
/*
import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';
*/
class DailyScrumPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('DailyScrumPage props', props);
    // this.state = this._todayState();
  }
  /*
  _todayState() {
    return {
      today: ScrumStore.today
    };
  }

  _todayChange() {
    this.setState(this._todayState());
  }
  */
  componentDidMount() {
    // const { match: { params: { scrumId } } } = this.props;
    /*
    this.todayChange = this._todayChange.bind(this);
    ScrumStore.addChangeListener(this.todayChange);
    ScrumService.invalidateToday();
    ScrumService.getToday(scrumId);
    */
    const { dispatch } = this.props;
    dispatch(fetchToday());
  }
  /*
  componentWillUnmount() {
    ScrumStore.removeChangeListener(this.todayChange);
  }
  */
  render() {
    let { today } = this.props;
    console.log('DailyScrumPage render today', today);
    if (today) {
      return (
        <Container text>
          { today.scrum && today.scrum.title &&
            <Header as='h2' icon textAlign='center' color='teal'>
              <Icon name='ordered list' circular />
              <Header.Content>
                { today.scrum.title }
              </Header.Content>
            </Header>
          }
          <DailyNavigationBar />
          {
            today.users && today.users.length ?
            today.users.map(
              user => <UserTasksBoard user={ user } key={ user.id } />
            ) : null
          }
        </Container>
      );
    } else {
      return (
        <Container text>
          <Dimmer active inverted>
            <Loader content='Loading' />
          </Dimmer>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log('DailyScrumPage mapStateToProps state', state);
  return state.scrum;
}

export default connect(mapStateToProps)(DailyScrumPage);
