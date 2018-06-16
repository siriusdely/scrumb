import React from 'react';
import { Comment
       , Container
       , Header } from 'semantic-ui-react';
import NewMessageForm from './NewMessageForm';

const MessagesSection = ({
  topic: {
    id,
    title,
    messages
  }
}) => {
  return (
    <Container>
      <Header as='h2' dividing>{ title }</Header>
      <Comment.Group minimal>
        { messages && messages.length ? orderedMessages(messages) : null }
        <NewMessageForm topicId={ id } />
      </Comment.Group>
    </Container>
  );
};

export default MessagesSection;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return sortedMessages.map(message => {
    return (
      <Comment key={ message.id }>
        <Comment.Avatar as='a' src={ message.user.avatar_url } />
        <Comment.Content>
          <Comment.Author>{ message.user.email }</Comment.Author>
          <Comment.Metadata>
            <span>{ message.created_at }</span>
          </Comment.Metadata>
          <Comment.Text>{ message.content }</Comment.Text>
          <Comment.Actions>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  });
};
