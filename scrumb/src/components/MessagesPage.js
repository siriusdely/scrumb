import React from 'react';
import DiscussionsList from './DiscussionsList';

export default class MessagesPage extends React.Component {
  render() {
    return (
      <div className='messages-page'>
        <DiscussionsList />
      </div>
    );
  }
}
