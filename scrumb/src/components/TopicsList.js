import React from 'react';
import NewTopicForm from './NewTopicForm';
import MessagesSection from './MessagesSection';
// import Cable from './Cable';
import TopicElement from './TopicElement';

import ChatService from '../services/ChatService';
import ChatStore from '../stores/ChatStore';

export default class TopicsList extends React.Component {
  /*
  state = {
    topics: ChatStore.topics,
    activeTopicId: ChatStore.currentTopic ? ChatStore.currentTopic.id : null,
  };
  */
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
  /*
  handleReceivedMessage = message => {
    console.log('message: ' + message)
    const topics = [...this.state.topics];
    const topic = topics.find(
      topic => topic.id === message.topic_id
    );
    // const topic = ChatStore.findTopic(message.topic_id);
    topic.messages = [...topic.messages, message];
    this.setState({ topics });
  };

  handleReceivedTopic = topic => {
    this.setState({
      topics: [...this.state.topics, topic]
    });
  };
  */
  render = () => {
    const { topics, activeTopicId } = this.state;
    return (
      <div className='topics-list'>
        {/* topics && topics.length ? (
          <Cable
            cable={ this.cable }
            topics={ topics }
            handleReceivedMessage={ this.handleReceivedMessage }
          />
        ) : null */}
        <h2>Topics</h2>
        <ul>
          {/* topics ? mapTopics(topics, this.handleClick) : null */}
          {
            topics ?
              topics.map(topic =>
                <TopicElement
                key={ topic.id }
                topic={ topic }
                // cable={ this.cable }
                // handleReceivedMessage={ this.handleReceivedMessage }
                handleClick={ this.handleClick } />
              ) : null
          }
        </ul>
        <NewTopicForm />
        {/* activeTopicId ? (
          <MessagesSection
            topic={ findActiveTopic(
              topics,
              activeTopicId
            ) }
          />
        ) : null */}
        { activeTopicId ? (
          <MessagesSection
            topic={ ChatStore.findTopic(activeTopicId) } />
        ) : null }
      </div>
    );
  };
}

/*
// helpers

const findActiveTopic = (topics, activeTopicId) => {
  return topics.find(
    topic => topic.id === activeTopicId
  );
};

const mapTopics = (topics, handleClick) => {
  return topics.map(topic => {
    return (
      <li key={ topic.id } onClick={ () => handleClick(topic.id) }>
        { topic.title }
      </li>
    );
  });
}
*/
