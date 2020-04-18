import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {
  Button,
  Input,
  Label,
  List,
  Segment,
} from 'semantic-ui-react';

import {
  ENTER_KEY,
  ESCAPE_KEY,
} from '../constants';

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
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      editing: null,
      editText: this.props.task.title,
    };
  }

  handleCancel() {
    this.setState({
      editing: null,
      editText: '',
    });
  }

  handleChange(e) {
    if (this.state.editing) {
      this.setState({ editText: e.target.value });
    }
  }

  handleEdit() {
    const { task } = this.props;
    this.setState({
      editing: task.id,
      editText: task.title,
    });
  }

  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.handleCancel(e);
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    const val = this.state.editText.trim();
    if (val !== this.props.task.title) {
      // console.log('SingleTaskItem handleSubmit val', val);
      this.props.onTitleChange(val);
      /*
    } else {
      this.props.onDestroy();
      */
    }

    this.setState({
      editing: null,
      editText: '',
    });
  }

  handleToggle() {
    // console.log('SingleTaskItem handleToggle', this.props.task);
    this.props.onToggle();
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.editing && this.state.editing) {
      // console.log('SingleTaskItem componentDidUpdate refs', this.refs);
      const node = ReactDom.findDOMNode(this.refs.editField);
      // console.log('SingleTaskItem componentDidUpdate node', node);
      const input = node.getElementsByTagName('input')[0];
      // console.log('SingleTaskItem componentDidUpdate input', input);
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  render() {
    const {
      labeled,
      task,
    } = this.props;

    let initials = task.owner && task.owner.full_name;
    initials = initials ? initials.slice(0, 2).toUpperCase() : null;
    initials = task.owner && task.owner.initials;

    let style = task.state === 'finished' ? styles.textDecorationLineThrough :
      styles.textDecorationInitial;
    if (this.state.editing) {
      style = {
        ...style,
        display: 'none',
      };
    }

    let editStyle = {
      display: 'none',
    };
    if (this.state.editing) {
      editStyle = {
        display: 'flex',
      }
    }

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button circular size='small' icon='edit outline' compact
            onClick={ this.handleEdit }
          />
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
          <span style={ style }>{ task.title }</span>
          <Input ref='editField' fluid
            style={ editStyle }
            value={ this.state.editText }
            onChange={ this.handleChange }
            onKeyDown={ this.handleKeyDown }
          />
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
