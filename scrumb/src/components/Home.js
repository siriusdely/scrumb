import React, { Component } from 'react';
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Header,
  Icon,
  Loader,
  Segment,
} from 'semantic-ui-react';
// import logo from './logo.svg';
// import './App.css';
import AuthStore from '../stores/AuthStore';
import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';

class Home extends Component {
  constructor() {
    super();
    this.state = this._getScrumsState();
    console.log(process.env);
    console.log(window.location.host);
    console.log(window.location.href);
    console.log(window.location.hostname);
    console.log(window.location.port);
  }

  _getScrumsState() {
    return {
      scrums: ScrumStore.scrums,
      scrum: ScrumStore.scrum
    }
  }

  _onStoreDidChange() {
    this.setState(this._getScrumsState());
  }

  componentDidMount() {
    this.storeDidChange = this._onStoreDidChange.bind(this);
    ScrumStore.addChangeListener(this.storeDidChange);
    ScrumService.getScrums();
  }

  componentWillUnmount() {
    ScrumStore.removeChangeListener(this.storeDidChange);
  }

  fetch(endpoint) {
    return window
      .fetch(endpoint, {
        headers: {
          'Authorization': AuthStore.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      // .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  getScrums() {
    this.fetch('/api/v1/scrums')
        .then(scrums => {
          if (scrums && scrums.length) {
            this.setState({ scrums: scrums });
            this.getScrum(scrums[0].id);
          } else {
            this.setState({ scrums: [], scrum: null });
          }
        });
  }

  getScrum(id) {
    this.fetch(`/api/v1/scrums/${id}`)
        .then(scrum => this.setState({ scrum: scrum }));
  }

  render() {
    let { scrums, scrum } = this.state;

    if (scrums) {
      return (
        <Container text>
          <Header as='h2' icon textAlign='center' color='teal'>
            <Icon name='unordered list' circular />
            <Header.Content>
              List of Public Ingredients
            </Header.Content>
          </Header>
          <Divider hidden section />
          {
            scrums && scrums.length
            ? <Button.Group color='teal' fluid widths={ scrums.length }>
              {
                Object.keys(scrums).map((key) => {
                  return (
                    <Button
                      active={ scrum && scrum.id === scrums[key].id }
                      fluid key={ key }
                      onClick={ () => ScrumService.getScrum(scrums[key].id) }>
                      { scrums[key].title }
                    </Button>
                  );
                })
              }
            </Button.Group>
            : <Container textAlign='center'>No scrums found.</Container>
          }
          <Divider section />
          {
            scrum &&
            <Container>
              <Header as='h2'>{scrum.title}</Header>
              { scrum.description && <p>{ scrum.description }</p> }
              { scrum.items &&
                <Segment.Group>
                  { scrum.items.map((item, i) =>
                    <Segment key={ i }>
                      { item.description }
                    </Segment>
                  )}
                </Segment.Group>
              }
              { scrum.items && <p>{ scrum.items }</p> }
              { scrum.link &&
                <Button basic size='tiny' color='teal' href={ scrum.link }>
                  Link
                </Button>
              }
            </Container>
          }
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

export default Home;
