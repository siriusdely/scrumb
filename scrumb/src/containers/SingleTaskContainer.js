import { connect } from 'react-redux';

import {
  toggleTask,
} from '../actions/TaskActions';

import SingleTaskItem from '../components/SingleTaskItem';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggle: toggleTask(ownProps.id),
  };
};

const SingleTaskContainer = connect(
  null,
  mapDispatchToProps,
)(SingleTaskItem);

export default SingleTaskContainer;
