import React from 'react';
import { Button, Card, Form, Icon, Modal } from 'semantic-ui-react';

const AddScrumCard = (props) => {
  return (
    <Card link color='grey' >
      <Modal dimmer='blurring' size='small'
             closeOnEscape={ true } closeOnDimmerClick={ true }
             open={ props.modal }
             onClose={ () => { props.onModal(false) } }>
        <Modal.Header>Create a New Scrum</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label='Title:' placeholder='title..'
                        name='title' value={ props.scrum.title }
                        onChange={ props.onChange } />
            <Form.TextArea label='Description'
                           placeholder='More information about the scrum..'
                           name='description' value={ props.scrum.description }
                           onChange={ props.onChange } />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={ () => props.onModal(false) }>
            Cancel
          </Button>
          <Button positive icon='checkmark' labelPosition='right'
                  content="Save" onClick={ () => props.onModal(false) } />
        </Modal.Actions>
      </Modal>

      <Card.Content textAlign='center'>
        <Card.Header>New Scrum</Card.Header>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <a onClick={ () => { props.onModal(true) } }>
          <Card.Description>
            <Icon name='add' circular size='big'
                  inverted color='grey' />
          </Card.Description>
        </a>
      </Card.Content>
    </Card>

  );
}

export default AddScrumCard;
