import React, { Component } from 'react';
import { Provider } from 'react-redux';

import DailyScrumApp from './DailyScrumApp';
import dailyStore from '../stores/dailyStore';

export default class DailyScrumRoot extends Component {
  render() {
    return (
      <Provider store={ dailyStore }>
        <DailyScrumApp match={ this.props.match } />
      </Provider>
    );
  }
}
