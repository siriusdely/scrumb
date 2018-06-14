import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesSection = ({
  topic: {
    id,
    title,
    messages
  }
}) => {
  return (
    <div className="messages-section">
      <h2>{ title }</h2>
      <ul>{ messages && messages.length ? orderedMessages(messages) : null }</ul>
      <NewMessageForm topicId={ id } />
    </div>
  );
};

export default MessagesSection;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return sortedMessages.map(message => {
    return <li key={ message.id }>{ message.content }</li>;
  });
};
