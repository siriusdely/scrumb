import React from 'react';
import { Menu } from 'semantic-ui-react';
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
      <Menu.Item key={ this.props.discussion.id } active={ this.props.active }
                 onClick={ () => this.props.handleClick(this.props.discussion.id) }>
          { this.props.discussion.topic }
      </Menu.Item>
    );
  }
}

export default DiscussionElement;
