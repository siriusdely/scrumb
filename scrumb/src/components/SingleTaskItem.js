import React, {
  Component,
  // createRef,
} from 'react';
import { findDOMNode } from 'react-dom';

import {
  Button,
  Form,
  Input,
  Label,
  List,
  Segment,
  // TextArea,
} from 'semantic-ui-react';

import TextArea from 'react-textarea-autosize';

import {
  ENTER_KEY,
  ESCAPE_KEY,
} from '../constants';

const editDescriptionButtonName = 'editDescriptionButton';
const editDescriptionFieldName = 'editDescriptionField';
const editTitleButtonName = 'editTitleButton';
const editTitleFieldName = 'editTitleField';

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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  state = {
    editingDescription: null,
    editingTitle: null,
    editDescriptionText: this.props.task.title,
    editTitleText: this.props.task.title,
  };

  // editDescriptionRef = createRef();

  handleCancel() {
    this.setState({
      editingDescription: null,
      editingTitle: null,
      editDescriptionText: '',
      editTitleText: '',
    });
  }

  handleChange(e) {
    /*
    console.log('SingleTaskItem handleChange event target name', e.target.name);
    console.log('SingleTaskItem handleChange event target value', e.target.value);
    */
    let {
      editingDescription,
      editingTitle,
      editDescriptionText,
      editTitleText,
    } = this.state;

    if (e.target.name === editTitleFieldName && editingTitle) {
      editTitleText = e.target.value;
    } else if (e.target.name === editDescriptionFieldName && editingDescription) {
      editDescriptionText = e.target.value;
    }

    this.setState({
      editDescriptionText,
      editTitleText,
    });
  }

  handleDelete() {
    this.props.onDelete();
  }

  handleEdit(event, data) {
    const { task } = this.props;
    let {
      editingDescription,
      editingTitle,
      editDescriptionText,
      editTitleText,
    } = this.state;

    if (data.name === editDescriptionButtonName) {
      editingDescription = task.id;
      editDescriptionText = task.description;
    } else if (data.name === editTitleButtonName) {
      editingTitle = task.id;
      editTitleText = task.title;
    }

    this.setState({
      editingDescription,
      editingTitle,
      editDescriptionText,
      editTitleText,
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === ESCAPE_KEY) {
      this.handleCancel(e);
    } else if (e.keyCode === ENTER_KEY && !e.shiftKey) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    let {
      editingDescription,
      editingTitle,
      editDescriptionText,
      editTitleText,
    } = this.state;

    const {
      onDescriptionChange,
      onTitleChange,
      task,
    } = this.props;

    if (e.target.name === editTitleFieldName && editingTitle) {
      const val = editTitleText.trim();
      if (val !== task.title) {
        // console.log('SingleTaskItem handleSubmit val', val);
        onTitleChange(val);
        /*
      } else {
        this.props.onDestroy();
      */
      }
      editingTitle = null;
      editTitleText = '';
    } else if (e.target.name === editDescriptionFieldName && editingDescription) {
      const val = editDescriptionText.trim();
      if (val !== task.title) {
        onDescriptionChange(val);
      }
      editingDescription = null;
      editDescriptionText = '';
    }

    this.setState({
      editingDescription,
      editingTitle,
      editDescriptionText,
      editTitleText,
    });
  }

  handleToggle() {
    // console.log('SingleTaskItem handleToggle', this.props.task);
    this.props.onToggle();
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.editingTitle && this.state.editingTitle) {
      // console.log('SingleTaskItem componentDidUpdate refs', this.refs);
      const editTitleField = findDOMNode(this.refs.editTitleField);
      const editTitleInput = editTitleField.getElementsByTagName('input')[0];
      // console.log('SingleTaskItem componentDidUpdate editTitleInput', editTitleInput);
      editTitleInput.focus();
      editTitleInput.setSelectionRange(editTitleInput.value.length, editTitleInput.value.length);
    }
    if (!prevState.editingDescription && this.state.editingDescription) {
      // const editDescriptionField = this.editDescriptionRef.current;
      const editDescriptionField = this.editDescriptionRef;
      // console.log('SingleTaskItem componentDidUpdate editDescriptionField', editDescriptionField);
      editDescriptionField.focus();
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
    if (this.state.editingTitle) {
      style = {
        ...style,
        display: 'none',
      };
    }

    let editStyle = {
      display: 'none',
    };
    if (this.state.editingTitle) {
      editStyle = {
        display: 'flex',
      }
    }

    return (
      <List.Item>
        <List.Content floated='right'>
          <Button circular size='small' icon='edit outline' compact
            name={ editTitleButtonName }
            onClick={ this.handleEdit }
          />
          <Button toggle circular size='small' icon='check' compact
            active={ task.state === 'finished' }
            onClick={ this.handleToggle }
          />
          <Button negative circular size='small' icon='times' compact
            onClick={ this.handleDelete }
          />
        </List.Content>
        <List.Content>
          { labeled && initials &&
          <Label as='a' active content={ initials } /> }
            { labeled && initials && ' ' }
            <span style={ style }>{ task.title }</span>
            <Input ref='editTitleField' fluid
              name={ editTitleFieldName }
              style={ editStyle }
              value={ this.state.editTitleText }
              onChange={ this.handleChange }
              onKeyDown={ this.handleKeyDown }
            />
          </List.Content>
          { task.description && <Segment style={ {
            display: this.state.editingDescription ? 'none' : 'flex',
          } }>
          <Label as='a' icon='edit outline' corner='right'
            name={ editDescriptionButtonName }
            onClick={ this.handleEdit }
          />
          <ul style={ {
            listStyleType: 'none',
            margin: 0,
            padding: 0,
          } }>
          { task.description
              .split('\n')
              .map((l, i) => <li key={i}>{l}</li>) }
            </ul>
        </Segment> }
          <Form style={ {
            display: this.state.editingDescription ? 'flex' : 'none',
          } }>
          {/* ref={ this.editDescriptionRef } */}
          <TextArea placeholder='Tell us more'
            inputRef={ ref => this.editDescriptionRef = ref }
            name={ editDescriptionFieldName }
            value={ this.state.editDescriptionText }
            onChange={ this.handleChange }
            onKeyDown={ this.handleKeyDown }
          />
        </Form>
      </List.Item>
    );
  }
}

export default SingleTaskItem;
