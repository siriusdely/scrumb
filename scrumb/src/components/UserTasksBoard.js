import React from 'react';
import {
  Grid
  , Header
  , Image
  , Segment
} from 'semantic-ui-react';

import TasksListRow from './TasksListRow';

export default class UserTasksBoard extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.rotations = props.user.rotations;
  }

  render() {
    return (
      <React.Fragment>
        <Header as='h3' attached='top'>
          <Image src={ this.user.avatar_url } rounded bordered />
          <Header.Content>
            { this.user.email }
            <Header.Subheader content={ this.user.role } />
          </Header.Content>
        </Header>
        <Segment color='teal' size='big' attached='bottom'>
          <Grid>
            {
              this.rotations.map(rotation =>
                <TasksListRow rotation={ rotation } key={ rotation.type } />
              )
            }
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
