import React, { Component } from 'react';
import { Label, List } from 'semantic-ui-react';

class SingleTaskItem extends Component {
  constructor(props) {
    super(props);
    this.task = props.task;
  }

  render() {
    let initial = this.task.owner && this.task.owner.email;
    initial = initial ? initial.slice(0, 2).toUpperCase() : null;
    return (
      <List.Item>
        { this.props.labeled && initial &&
          <Label as='a' active content={ initial } /> }
        { this.props.labeled && initial && ' ' }
        { this.task.title }
      </List.Item>
    );
  }
}

export default SingleTaskItem;
