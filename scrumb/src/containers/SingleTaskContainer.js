import { connect } from 'react-redux';

import {
  toggleTask,
  updateTask,
} from '../actions/TaskActions';

import SingleTaskItem from '../components/SingleTaskItem';

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log('SingleTaskContainer mapDispatchToProps ownProps', ownProps);
  return {
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
