import React from 'react';
import ChatService from '../services/ChatService';

class TopicElement extends React.Component {
  componentDidMount = () => {
    ChatService.subscribeToTopic(this.props.topic.id);
  }

  componentWillUnmount = () => {
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

export default TopicElement;
