import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';

import SingleTaskItem from './SingleTaskItem';

class TasksListRow extends Component {
  render() {
    const {
      onToggleTask,
      rotation,
    } = this.props;

    return (
      <React.Fragment>
        <Grid.Column width={ 4 }>
          { rotation.name + ':' }
        </Grid.Column>
        <Grid.Column width={ 12 }>
          <List ordered>
            {
              rotation.tasks.map(task =>
              <SingleTaskItem
                key={ task.id }
                labeled={ rotation.type === 'tomorrow' }
                task={ task }
                onToggle={ () => onToggleTask(task.id) }
              />
              )
            }
          </List>
        </Grid.Column>
      </React.Fragment>
    );
  }
}

export default TasksListRow;
