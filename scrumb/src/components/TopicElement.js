import React from 'react';
import { List } from 'semantic-ui-react';
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
      <List.Item key={ this.props.topic.id } active={ this.props.topic.id === 2 }
                 onClick={ () => this.props.handleClick(this.props.topic.id) }>
        <List.Content>
          <List.Header>{ this.props.topic.title }</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

export default TopicElement;
