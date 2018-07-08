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
      <React.Fragment>
        <Grid.Column width={ 4 }>
          { this.rotation.name + ':' }
        </Grid.Column>
        <Grid.Column width={ 12 }>
          <List ordered>
            {
              this.rotation.tasks.map(task =>
                <SingleTaskItem task={ task } key={ task.id } labeled={ this.rotation.type === 'tomorrow' } />
              )
            }
          </List>
        </Grid.Column>
      </React.Fragment>
    );
  }
}

export default TasksListRow;
