import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function SingleScrumModal(props) {
  return (
    <Modal dimmer='blurring' size='small'
           closeOnEscape={ true } closeOnDimmerClick={ true }
           open={ props.modal }
           onClose={ () => { props.onModal(false) } }>

      <Modal.Header>Create a New Scrum</Modal.Header>
      <Modal.Content>
        <Form onSubmit={ props.onSubmit }>
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
                content="Save" onClick={ () => {
                    props.onModal(false);
                    props.onSubmit();
                } } />
      </Modal.Actions>
    </Modal>
  );
}

// module.exports = SingleScrumModal;
export default SingleScrumModal;
