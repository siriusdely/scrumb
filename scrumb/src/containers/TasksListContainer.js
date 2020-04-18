import { connect } from 'react-redux';

import TasksListRow from '../components/TasksListRow';

const mapStateToProps = (state, ownProps) => {
  // console.log('TasksListContainer mapStateToProps state', state);
  // console.log('TasksListContainer mapStateToProps ownProps', ownProps);

  const rotation = Object.assign({}, ownProps.rotation, {
    tasks: ownProps.rotation.tasks.map(task => state.tasks[task.id]),
    // tasks: ownProps.rotation.tasks.map(task => Object.assign({}, state.scrum.tasks[task.id], { title: 'sirius' })),
  });
  // console.log('TasksListContainer mapStateToProps rotation', rotation);
  return Object.assign({}, ownProps, {
    rotation,
  });
};

const TasksListContainer = connect(
  mapStateToProps,
)(TasksListRow);

export default TasksListContainer;
