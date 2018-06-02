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

class Home extends Component {
  constructor() {
    super();
    this.state = {};
    this.getScrums = this.getScrums.bind(this);
    this.getScrum = this.getScrum.bind(this);
  }

  componentDidMount() {
    this.getScrums();
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
                 .then(response => response.json())
    // .then(json => console.log(json))
                 .catch(error => console.log(error));
  }

  getScrums() {
    this.fetch('/api/scrums')
        .then(scrums => {
          if (scrums && scrums.length) {
            this.setState({ scrums: scrums });
            this.getScrum(scrums[0].id);
          } else {
            this.setState({ scrums: []});
          }
        });
  }

  getScrum(id) {
    this.fetch(`/api/scrums/${id}`)
        .then(scrum => this.setState({ scrum: scrum }));
  }

  render() {
    /*
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    */

    let { scrums, scrum } = this.state;
    if (scrums) {
      return (
        <Container text>
          <Header as='h2' icon textAlign='center' color='teal'>
            <Icon name='unordered list' circular />
            <Header.Content>
              List of Ingredients
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
                      onClick={ () => this.getScrum(scrums[key].id) }>
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
              { scrum.tasks && <p>{ scrum.tasks }</p> }
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
