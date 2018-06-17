import React from 'react';
import { Container
       , Grid
       , Header
       , List } from 'semantic-ui-react';

import NewDiscussionForm from './NewDiscussionForm';
import MessagesSection from './MessagesSection';
import DiscussionElement from './DiscussionElement';

import ChatService from '../services/ChatService';
import ChatStore from '../stores/ChatStore';

export default class DiscussionsList extends React.Component {

  constructor(props) {
    super(props);
    this.cable = ChatService.initCable();
    this.state = {
      discussions: ChatStore.discussions,
      activeDiscussionId: ChatStore.currentDiscussion ? ChatStore.currentDiscussion.id : null,
    };
  }

  _chatStoreChange() {
    this.setState({
      discussions: ChatStore.discussions,
      activeDiscussionId: ChatStore.currentDiscussion.id,
    });
  }

  componentDidMount = () => {
    this.chatStoreChange = this._chatStoreChange.bind(this);
    ChatStore.addChangeListener(this.chatStoreChange);
    ChatService.getDiscussions();
  };

  componentWillUnmount = () => {
    ChatService.deinitCable();
  }

  handleClick = id => {
    this.setState({ activeDiscussionId: id });
  };

  render = () => {
    const { discussions, activeDiscussionId } = this.state;
    return (
      <Container text>
        <Grid>
          <Grid.Row>
            <Header as='h2'>Discussions</Header>
          </Grid.Row>
          <NewDiscussionForm />
          <Grid.Row>
            <Grid.Column width={ 5 }>
              <List selection verticalAlign='middle'>
                {
                  discussions ?
                  discussions.map(discussion =>
                    <DiscussionElement
                      key={ discussion.id }
                      discussion={ discussion }
                      handleClick={ this.handleClick } />
                  ) : null
                }
              </List>
            </Grid.Column>
            <Grid.Column width={ 11 } stretched>
              { activeDiscussionId ? (
                  <MessagesSection
                    discussion={ ChatStore.findDiscussion(activeDiscussionId) } />
              ) : null }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };
}
