import React from 'react';
import {
  Card,
  Container,
  Dimmer,
  Icon,
  Loader
} from 'semantic-ui-react';

import ScrumService from '../services/ScrumService';
import ScrumStore from '../stores/ScrumStore';

export default class ScrumsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrums: ScrumStore.scrums
    };
  }

  onStoreChange() {
    this.setState({
      scrums: ScrumStore.scrums
    });
  }

  componentDidMount() {
    this.onStoreChange = this.onStoreChange.bind(this);
    ScrumStore.addChangeListener(this.onStoreChange);
    ScrumService.getScrums();
  }

  componentWillUnmount() {
    ScrumStore.removeChangeListener(this.onStoreChange);
  }

  render() {
    let { scrums } = this.state;
    if (scrums) {
      return (
        <Container text>
          {
            scrums && scrums.length ?
            <Card.Group centered itemsPerRow="2">
              {
                scrums.map((scrum) => {
                  return (
                    <Card key={ scrum.id }
                          color='teal'
                          href='#card-example-link-card'>
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
                  );
                })
              }
            </Card.Group>
            : <Container textAlign='center'>No scrums found.</Container>
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
