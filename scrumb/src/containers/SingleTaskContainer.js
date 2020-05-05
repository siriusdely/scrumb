import { connect } from 'react-redux';

import {
  deleteTask,
  toggleTask,
  updateTask,
} from '../actions/TaskActions';

import SingleTaskItem from '../components/SingleTaskItem';

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log('SingleTaskContainer mapDispatchToProps ownProps', ownProps);
  return {
    onDelete: _ => {
      const { task, rotation } = ownProps;
      const { day_id, type, user_id } = rotation;
      const _rotation = { day_id, type, user_id };
      const _task = {
        id: task.id,
        rotation: _rotation,
      };

      return dispatch(deleteTask(_task));
    },
    onDescriptionChange: (description) => {
      const _task = ownProps.task;
      const task = {
        ..._task,
        description,
      };
      return dispatch(updateTask(task));
    },
    onToggle: () => dispatch(toggleTask(ownProps.task.id)),
    onTitleChange: (title) => {
      const _task = ownProps.task;
      const task = {
        ..._task,
        title,
      };
      return dispatch(updateTask(task));
    },
  };
};

const SingleTaskContainer = connect(
  null,
  mapDispatchToProps,
)(SingleTaskItem);

export default SingleTaskContainer;
