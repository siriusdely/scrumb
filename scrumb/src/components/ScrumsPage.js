import React from 'react';
import { Route } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Icon,
  Loader,
  Modal
} from 'semantic-ui-react';

import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';

export default class ScrumsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      modal: false,
      scrums: ScrumStore.scrums,
      title: ''
    };
  }

  handleStoreChange() {
    this.setState({
      scrums: ScrumStore.scrums
    });
  }

  componentDidMount() {
    this.handleStoreChange = this.handleStoreChange.bind(this);
    ScrumStore.addChangeListener(this.handleStoreChange);
    ScrumService.getScrums();
  }

  componentWillUnmount() {
    ScrumStore.removeChangeListener(this.handleStoreChange);
  }

  handleModal(open) {
    this.setState({
      modal: open
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let { scrums } = this.state;
    if (scrums) {
      return (
        <Container text>
          <Modal dimmer='blurring' size='small'
                 closeOnEscape={ true } closeOnDimmerClick={ true }
                 open={ this.state.modal }
                 onClose={ () => { this.handleModal(false) } }>
            <Modal.Header>Create a New Scrum</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Input label='Title:' placeholder='title..'
                            name='title' value={ this.state.title }
                            onChange={ this.handleChange.bind(this) } />
                <Form.TextArea label='Description' placeholder='More information about the scrum..'
                               name='description' value={ this.state.description }
                               onChange={ this.handleChange.bind(this) } />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={ () => this.handleModal(false) }>
                Cancel
              </Button>
              <Button positive icon='checkmark' labelPosition='right'
                content="Save" onClick={ () => this.handleModal(false) } />
            </Modal.Actions>
          </Modal>

          <Card.Group centered itemsPerRow="2">
            <Card color='grey' >
              <Card.Content textAlign='center'>
                <a onClick={ () => { this.handleModal(true) } }>
                  <Card.Description>
                    <Icon name='add' circular size='huge'
                          inverted color='grey' />
                  </Card.Description>
                </a>
              </Card.Content>
            </Card>

            {
              scrums &&
              scrums.map((scrum) => {
                return (
                  <Route key={ scrum.id } render={ ({ history }) => (
                    <Card color='teal'
                      onClick={ () => history.push(`/scrums/${scrum.id}`) }>

                      <Card.Content>
                        <Card.Header>{ scrum.title }</Card.Header>
                        <Card.Meta>
                          <span className='date'>{ scrum['updated_at'] }</span>
                        </Card.Meta>
                        <Card.Description>{ scrum.description }</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Icon name='user' />
                        { scrum['created_at'] }
                      </Card.Content>
                    </Card>
                  ) } />
                );
              })
            }

          </Card.Group>
        </Container>
      );
    } else {
      return (
        <Container text>
          <Dimmer active inverted>
            <Loader content='Loading' />
          </Dimmer>
        </Container>
      );
    }
  }
}
