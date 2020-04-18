import React from 'react';

import { Container
       , Dimmer
       , Header
       , Icon
       , Loader } from 'semantic-ui-react';

import DailyNavigationBar from './DailyNavigationBar';
import UserTasksBoard from './UserTasksBoard';

export default class DailyScrumPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('DailyScrumPage props', props);
  }

  render() {
    let { today, toggleTask } = this.props;
    // console.log('DailyScrumPage render today', today);
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
                user => <UserTasksBoard
                  key={ user.id }
                  onToggleTask={ toggleTask }
                  user={ user }
                />
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
