import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';
import UserTasksBoard from './UserTasksBoard';

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

  render() {
    let { today } = this.state;
    console.log(today)
    return (
      <Container text>
        <Grid celled>
          {
            today && today.users && today.users.length ?
            today.users.map(
              user =>
                <UserTasksBoard user={ user } key={ user.id } />
            ) : null
          }
        </Grid>
      </Container>
    );
  }
}
