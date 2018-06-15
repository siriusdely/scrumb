import React from 'react';
import NewTopicForm from './NewTopicForm';
import MessagesSection from './MessagesSection';
import TopicElement from './TopicElement';

import ChatService from '../services/ChatService';
import ChatStore from '../stores/ChatStore';

export default class TopicsList extends React.Component {

  constructor(props) {
    super(props);
    this.cable = ChatService.initCable();
    this.state = {
      topics: ChatStore.topics,
      activeTopicId: ChatStore.currentTopic ? ChatStore.currentTopic.id : null,
    };
  }

  _chatStoreChange() {
    this.setState({
      topics: ChatStore.topics,
      activeTopicId: ChatStore.currentTopic.id,
    });
  }

  componentDidMount = () => {
    this.chatStoreChange = this._chatStoreChange.bind(this);
    ChatStore.addChangeListener(this.chatStoreChange);
    ChatService.getTopics();
  };

  componentWillUnmount = () => {
    ChatService.deinitCable();
  }

  handleClick = id => {
    this.setState({ activeTopicId: id });
  };

  render = () => {
    const { topics, activeTopicId } = this.state;
    return (
      <div className='topics-list'>
        <h2>Topics</h2>
        <ul>
          {
            topics ?
              topics.map(topic =>
                <TopicElement
                key={ topic.id }
                topic={ topic }
                handleClick={ this.handleClick } />
              ) : null
          }
        </ul>
        <NewTopicForm />
        { activeTopicId ? (
          <MessagesSection
            topic={ ChatStore.findTopic(activeTopicId) } />
        ) : null }
      </div>
    );
  };
}
