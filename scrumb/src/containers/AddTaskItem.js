import React from 'react';
import { connect } from 'react-redux';
import {
  Input,
  List,
} from 'semantic-ui-react';

import {
  addTask,
} from '../actions/TaskActions';
import {
  ENTER_KEY,
} from '../constants';

let AddTaskItem = ({
  dispatch,
  rotation,
  scrumId,
}) => {
  let input;
  return (
    <List.Item>
      <List.Content>
        <Input
          ref={ node => {
            if (!node || !node.inputRef) { return; } 
            input = node.inputRef;
          } }
          onKeyDown={ e => {
            if (!(e.keyCode === ENTER_KEY && !e.shiftKey)) { return; }
            e.preventDefault();
            if (!input.value.trim()) { return; }
            dispatch(addTask({
              rotation: {
                day_id: rotation.day_id,
                type: rotation.type,
                user_id: rotation.user_id,
              },
              scrum_id: scrumId,
              title: input.value,
              user_id: rotation.user_id,
            }));
            input.value = '';
          } }
          style={ {
            display: 'flex',
          } }>
        </Input>
      </List.Content>
    </List.Item>
  );
};

const mapStateToProps = state => {
  return {
    scrumId: state.scrum.today.scrum.id,
  };
};

AddTaskItem = connect(
  mapStateToProps,
)(AddTaskItem);

export default AddTaskItem;
