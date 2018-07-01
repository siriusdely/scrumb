import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';

import SingleTaskItem from './SingleTaskItem';

class TasksListRow extends Component {
  constructor(props) {
    super(props);
    this.rotation = props.rotation;
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={ 4 }>
          TODOS:
        </Grid.Column>
        <Grid.Column width={ 12 }>
          <List ordered>
            {
              this.rotation.rotations.map(rotation =>
                <SingleTaskItem task={ rotation.task } key={ rotation.task.id } />
              )
            }
          </List>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default TasksListRow;
