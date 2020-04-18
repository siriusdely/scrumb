import React, { Component } from 'react';
import { Provider } from 'react-redux';

import DailyScrumPage from '../components/DailyScrumPage';
import dailyStore from '../stores/dailyStore';

export default class DailyScrumRoot extends Component {
  render() {
    return (
      <Provider store={ dailyStore }>
        <DailyScrumPage match={ this.props.match } />
      </Provider>
    );
  }
}
