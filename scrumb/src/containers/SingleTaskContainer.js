import { connect } from 'react-redux';

import {
  toggleTask,
  updateTask,
} from '../actions/TaskActions';

import SingleTaskItem from '../components/SingleTaskItem';

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log('SingleTaskContainer mapDispatchToProps ownProps', ownProps);
  return {
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
