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

import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';

class Private extends Component {
  constructor() {
    super();
    this.state = this._getScrumsState();
    console.log(window.location.host);
    console.log(window.location.href);
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

  render() {
    let { scrums, scrum } = this.state;
    if (scrums) {
      return (
        <Container text>
          <Header as='h2' icon textAlign='center' color='teal'>
            <Icon name='unordered list' circular />
            <Header.Content>
              List of Private Ingredients
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
              { scrum.tasks &&
                <Segment.Group>
                  { scrum.tasks.map((task, i) =>
                    <Segment key={ i }>
                      { task.description }
                    </Segment>
                  )}
                </Segment.Group>
              }
              { scrum.items && <p>{ scrum.items }</p> }
              { scrum.link &&
                <Button target='_blank' basic size='tiny' color='teal' href={ scrum.link }>
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

export default Private;
