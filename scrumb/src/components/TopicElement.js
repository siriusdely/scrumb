import React from 'react';
// import { MESSAGES_CHANNEL } from '../constants/ChatConstants';
import ChatService from '../services/ChatService';

class TopicElement extends React.Component {
  componentDidMount = () => {
    /*
    this.messages = this.props.cable.subscriptions.create({
      channel: MESSAGES_CHANNEL,
      topic_id: this.props.topic.id
    }, {
      connected: () => {
        console.log('cable connected');
      },
      received: (message) => {
        this.props.handleReceivedMessage(message);
      }
    });
    */
    ChatService.subscribeToTopic(this.props.topic.id);
  }

  componentWillUnmount = () => {
    // this.messages.unsubscribe();
    ChatService.unsubscribeFromTopic(this.props.topic.id);
  }

  render() {
    return (
      <li key={ this.props.topic.id }
        onClick={ () => this.props.handleClick(this.props.topic.id) }>
        { this.props.topic.title }
      </li>
    );
  }
}
/*
const TopicElement = ({topic, handleClick}) => {
  return (
    <li key={ topic.id } onClick={ () => handleClick(topic.id) }>
      { topic.title }
    </li>
  );
}
*/
export default TopicElement;
