import React from 'react';
import {
  Grid
  , Header
  , Image
  , Label
  , Segment
} from 'semantic-ui-react';

import TasksListRow from './TasksListRow';

export default class UserTasksBoard extends React.Component {
  render() {
    const {
      onToggleTask,
      user,
    } = this.props;
    const {
      avatar_url,
      first_name,
      last_name,
      initials,
      role,
      rotations,
    } = user;

    return (
      <React.Fragment>
        <Header as='h3' attached='top'>
          <Image src={ avatar_url } rounded bordered />
          <Header.Content>
            { `${ first_name } ${ last_name }` }
            <Label content={ initials } />
            <Header.Subheader content={ role } />
          </Header.Content>
        </Header>
        <Segment color='teal' size='big' attached='bottom'>
          <Grid>
            {
              rotations.map(rotation =>
              <TasksListRow
                key={ rotation.type }
                rotation={ rotation }
                onToggleTask={ onToggleTask }
              />
              )
            }
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
