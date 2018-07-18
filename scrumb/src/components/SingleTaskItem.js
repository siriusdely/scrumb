import React, { Component } from 'react';
import { Label, List, Segment } from 'semantic-ui-react';

class SingleTaskItem extends Component {
  constructor(props) {
    super(props);
    this.task = props.task;
  }

  render() {
    let initials = this.task.owner && this.task.owner.full_name;
    initials = initials ? initials.slice(0, 2).toUpperCase() : null;
    initials = this.task.owner && this.task.owner.initials;
    return (
      <List.Item>
        { this.props.labeled && initials &&
          <Label as='a' active content={ initials } /> }
        { this.props.labeled && initials && ' ' }
        { this.task.title }
        { this.task.description && <Segment content={ this.task.description} /> }
      </List.Item>
    );
  }
}

export default SingleTaskItem;
