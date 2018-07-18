import React, { Component } from 'react';
import { Button, Label, List, Segment } from 'semantic-ui-react';

class SingleTaskItem extends Component {
  constructor(props) {
    super(props);
    this.task = props.task;
  }

  render() {
    var styles = {
      textDecorationInitial: {
        textDecoration: 'initial'
      },
      textDecorationLineThrough: {
        textDecoration: 'line-through'
      }
    }

    let initials = this.task.owner && this.task.owner.full_name;
    initials = initials ? initials.slice(0, 2).toUpperCase() : null;
    initials = this.task.owner && this.task.owner.initials;
    return (
      <List.Item>
        <List.Content floated='right'>
          <Button circular size='small' icon='edit outline' compact />
          <Button toggle circular size='small' icon='check' compact
                  active={ this.task.state === 'finished' } />
          <Button negative circular size='small' icon='times' compact />
        </List.Content>
        <List.Content>
          { this.props.labeled && initials &&
            <Label as='a' active content={ initials } /> }
          { this.props.labeled && initials && ' ' }
          <span style={ this.task.state === 'finished' ? styles.textDecorationLineThrough : styles.textDecorationInitial }>{ this.task.title }</span>
        </List.Content>
        { this.task.description && <Segment>
          <Label as='a' icon='edit outline' corner='top right' />
          { this.task.description }
          </Segment> }
      </List.Item>
    );
  }
}

export default SingleTaskItem;
