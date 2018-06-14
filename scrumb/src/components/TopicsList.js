import React from 'react';
import ActionCable from 'actioncable';
import NewTopicForm from './NewTopicForm';
import MessagesSection from './MessagesSection';
import Cable from './Cable';

import { CABLE_URL, TOPICS_URL } from '../constants/ChatConstants';
import AuthStore from '../stores/AuthStore';

export default class TopicsList extends React.Component {
  state = {
    topics: [],
    activeTopic: null,
  };

  componentDidMount = () => {
    fetch(TOPICS_URL, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => resp.json())
      .then(topics => this.setState({
        topics,
        activeTopicId: topics[0].id
      }))
      .catch(error => console.log(error) );

    this.cable = ActionCable.createConsumer(CABLE_URL);
    this.topics = this.cable.subscriptions.create({
      channel: 'TopicsChannel'
    }, {
      connected: (c) => {
        console.log('connected: ' + c);
      },
      received: (topic) => {
        this.handleReceivedTopic(topic);
      },
      create: function(content) {
        this.perform('create', { content });
      }
    });
  };

  componentWillUnmount = () => {
    this.topics.unsubscribe();
  }

  handleClick = id => {
    this.setState({ activeTopicId: id });
  };

  handleReceivedMessage = message => {
    console.log('message: ' + message)
    const topics = [...this.state.topics];
    const topic = topics.find(
      topic => topic.id === message.topic_id
    );
    topic.messages = [...topic.messages, message];
    this.setState({ topics });
  };

  handleReceivedTopic = topic => {
    this.setState({
      topics: [...this.state.topics, topic]
    });
  };

  render = () => {
    const { topics, activeTopicId } = this.state;
    return (
      <div className='topics-list'>
        { topics && topics.length ? (
          <Cable
            cable={ this.cable }
            topics={ topics }
            handleReceivedMessage={ this.handleReceivedMessage }
          />
        ) : null }
        <h2>Topics</h2>
        <ul>
          { topics ? mapTopics(topics, this.handleClick) : null }
        </ul>
        <NewTopicForm />
        { activeTopicId ? (
          <MessagesSection
            topic={ findActiveTopic(
              topics,
              activeTopicId
            ) }
          />
        ) : null }
      </div>
    );
  };
}

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
