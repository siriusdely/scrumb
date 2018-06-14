import React from 'react';
import TopicsList from './TopicsList';

export default class MessagesPage extends React.Component {
  render() {
    return (
      <div className='messages-page'>
        <TopicsList />
      </div>
    );
  }
}
