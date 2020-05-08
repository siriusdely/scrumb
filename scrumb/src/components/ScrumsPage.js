import React from 'react';
// import { Route } from 'react-router-dom';
import {
  Card,
  Container,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

import AddScrumCard from './AddScrumCard';
import SingleScrumItem from './SingleScrumItem';
// import Today from './Today';

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
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    let { title, description } = this.state;

    this.setState({
      title: '',
      description: ''
    });

    title = title.trim();
    description = description.trim();
    if (title && description) {
      ScrumService.createScrum(title, description);
    }
  }

  render() {
    let { scrums } = this.state;
    if (scrums) {
      return (
        <Container text>
          <Card.Group centered itemsPerRow="2">
            <AddScrumCard
              scrum={ {
                  description: this.state.description,
                  title: this.state.title
              } }
              modal={ this.state.modal }
              onModal={ this.handleModal.bind(this) }
              onChange={ this.handleChange.bind(this) }
              onSubmit={ this.handleSubmit.bind(this) } />

            {
              scrums &&
              scrums.map((scrum) =>
                <SingleScrumItem key={ scrum.id } scrum={ scrum } />)
            }

          </Card.Group>
          {/*<Route path='/scrums/:scrumId' exact component={ Today } />*/}
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
