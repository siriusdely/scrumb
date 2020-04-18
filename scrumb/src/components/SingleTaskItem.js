import React, { Component } from 'react';
import { Button, Label, List, Segment } from 'semantic-ui-react';

const styles = {
  textDecorationInitial: {
    textDecoration: 'initial'
  },
  textDecorationLineThrough: {
    textDecoration: 'line-through'
  }
}

class SingleTaskItem extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    console.log('SingleTaskItem handleToggle', this.props.task);
    this.props.onToggle();
  }

  render() {
    const {
      labeled,
      task,
    } = this.props;

    let initials = task.owner && task.owner.full_name;
    initials = initials ? initials.slice(0, 2).toUpperCase() : null;
    initials = task.owner && task.owner.initials;
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button circular size='small' icon='edit outline' compact />
          <Button toggle circular size='small' icon='check' compact
            active={ task.state === 'finished' }
            onClick={ this.handleToggle }
          />
          <Button negative circular size='small' icon='times' compact />
        </List.Content>
        <List.Content>
          { labeled && initials &&
            <Label as='a' active content={ initials } /> }
          { labeled && initials && ' ' }
          <span style={
            task.state === 'finished' ?
            styles.textDecorationLineThrough :
            styles.textDecorationInitial }>{ task.title }</span>
        </List.Content>
        { task.description && <Segment>
          <Label as='a' icon='edit outline' corner='right' />
          { task.description }
          </Segment> }
      </List.Item>
    );
  }
}

export default SingleTaskItem;
