import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import TasksListRow from './TasksListRow';

export default class UserTasksBoard extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.scrum.user;
    this.rotations = props.scrum.rotations;
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3'>{ this.user.first_name }</Header>
          </Grid.Column>
        </Grid.Row>
        {
          this.rotations.map(rotation =>
            <TasksListRow rotation={ rotation } key={ rotation.name } />
          )
        }
      </React.Fragment>
    );
  }
}
