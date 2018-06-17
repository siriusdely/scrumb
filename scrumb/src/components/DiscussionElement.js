import React from 'react';
import { List } from 'semantic-ui-react';
import ChatService from '../services/ChatService';

class DiscussionElement extends React.Component {
  componentDidMount = () => {
    ChatService.subscribeToDiscussion(this.props.discussion.id);
  }

  componentWillUnmount = () => {
    ChatService.unsubscribeFromDiscussion(this.props.discussion.id);
  }

  render() {
    return (
      <List.Item key={ this.props.discussion.id } active={ this.props.discussion.id === 2 }
                 onClick={ () => this.props.handleClick(this.props.discussion.id) }>
        <List.Content>
          <List.Header>{ this.props.discussion.topic }</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

export default DiscussionElement;
