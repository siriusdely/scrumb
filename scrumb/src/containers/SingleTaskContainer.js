import { connect } from 'react-redux';

import {
  toggleTask,
} from '../actions/TaskActions';

import SingleTaskItem from '../components/SingleTaskItem';

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log('SingleTaskContainer mapDispatchToProps ownProps', ownProps);
  return {
    onToggle: () => dispatch(toggleTask(ownProps.task.id)),
  };
};

const SingleTaskContainer = connect(
  null,
  mapDispatchToProps,
)(SingleTaskItem);

export default SingleTaskContainer;
