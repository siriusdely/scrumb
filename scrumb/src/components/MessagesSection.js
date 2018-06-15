import React from 'react';
import { Comment
       , Container
       , Divider
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
      <Header as='h2'>{ title }</Header>
      <Comment.Group>
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
        <Divider />
        <Comment.Avatar as='a' src={ message.user.avatar_url } />
        <Comment.Content>
          <Comment.Author>{ message.user.email }</Comment.Author>
          <Comment.Metadata>
            Today at 5:42PM
          </Comment.Metadata>
          <Comment.Text>{ message.content }</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  });
};
