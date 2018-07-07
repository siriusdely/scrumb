import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

import DailyNavigationBar from './DailyNavigationBar';
import UserTasksBoard from './UserTasksBoard';

import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';

export default class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._todayState();
  }

  _todayState() {
    return {
      today: ScrumStore.today
    };
  }

  _todayChange() {
    this.setState(this._todayState());
  }

  componentDidMount() {
    this.todayChange = this._todayChange.bind(this);
    ScrumStore.addChangeListener(this.todayChange);
    ScrumService.getToday(1);
  }

  componentWillUnmount() {
    ScrumStore.removeChangeListener(this.todayChange);
  }

  render() {
    let { today } = this.state;
    return (
      <Container text>
        { today && today.scrum && today.scrum.title &&
          <Header as='h2' icon textAlign='center' color='teal'>
            <Icon name='ordered list' circular />
            <Header.Content>
              { today.scrum.title }
            </Header.Content>
          </Header>
        }
        <DailyNavigationBar />
          {
            today && today.users && today.users.length ?
            today.users.map(
              user =>
                <UserTasksBoard user={ user } key={ user.id } />
            ) : null
          }
      </Container>
    );
  }
}
