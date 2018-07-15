import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

import { DiscussionsList, NewDiscussionForm } from './discussions';
import { MessagesSection } from './messages';

import ChatService from '../services/ChatService';
import ChatStore from '../stores/ChatStore';

export default class DiscussionsPage extends React.Component {
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
    ChatStore.removeChangeListener(this.chatStoreChange);
  }

  handleClick = id => {
    this.setState({ activeDiscussionId: id });
  };

  render() {
    const { discussions, activeDiscussionId } = this.state;

    return (
      <Container text>
        <Grid>
          <Grid.Column width={ 5 }>
            <Header as='h2'>Topics</Header>
            <NewDiscussionForm />
            { discussions && <DiscussionsList discussions={ discussions }
                                              handleClick={ this.handleClick }
                                              activeDiscussionId={ activeDiscussionId } />
            }
          </Grid.Column>
          <Grid.Column width={ 11 } stretched>
            { activeDiscussionId ? (
                <MessagesSection
                  discussion={ ChatStore.findDiscussion(activeDiscussionId) } />
            ) : null }
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
