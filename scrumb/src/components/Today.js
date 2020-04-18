import React from 'react';
import { Container
       , Dimmer
       , Header
       , Icon
       , Loader } from 'semantic-ui-react';

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

    const { match: { params: { scrumId } } } = this.props;
    ScrumService.invalidateToday();
    ScrumService.getToday(scrumId);
  }

  componentWillUnmount() {
    ScrumStore.removeChangeListener(this.todayChange);
  }

  render() {
    let { today } = this.state;
    console.log(today)
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
