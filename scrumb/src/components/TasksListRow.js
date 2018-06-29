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
          { this.rotation.name }
        </Grid.Column>
        <Grid.Column width={ 12 }>
          <List ordered>
            {
              this.rotation.tasks.map(task =>
                <SingleTaskItem task={ task } key={ task.id } />
              )
            }
          </List>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default TasksListRow;
