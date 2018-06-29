import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

class SingleTaskItem extends Component {
  constructor(props) {
    super(props);
    this.task = props.task;
  }

  render() {
    return (
      <List.Item>{ this.task.title }</List.Item>
    );
  }
}

export default SingleTaskItem;
