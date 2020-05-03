import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';

import SingleTaskContainer from '../containers/SingleTaskContainer';
import AddTaskItem from '../containers/AddTaskItem';

class TasksListRow extends Component {
  render() {
    const {
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
              <SingleTaskContainer
                key={ task.id }
                labeled={ rotation.type === 'tomorrow' }
                task={ task }
              />
              )
            }
            <AddTaskItem rotation={ rotation } />
          </List>
        </Grid.Column>
      </React.Fragment>
    );
  }
}

export default TasksListRow;
