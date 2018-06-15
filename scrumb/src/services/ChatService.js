// import ActionCable from 'actioncable';
import ActionCable from 'action-cable-react-jwt';

import { CABLE_URL,
         MESSAGES_CHANNEL,
         TOPICS_CHANNEL,
         TOPICS_URL } from '../constants/ChatConstants';
import ChatActions from '../actions/ChatActions';
import AuthStore from '../stores/AuthStore';

class ChatService {
  getTopics() {
    fetch(TOPICS_URL, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => resp.json())
      .then(topics => {
        ChatActions.gotTopics(topics);
      }).catch(error => console.log(error) );
  }

  initCable() {
    this._cable = ActionCable.createConsumer(CABLE_URL, AuthStore.jwt);
    this._topicsSubscription = this.cable.subscriptions.create({
      channel: TOPICS_CHANNEL
    }, {
      connected: (c) => {
        console.log('connected: ' + c);
      },
      received: (topic) => {
        // this.handleReceivedTopic(topic);
        ChatActions.gotNewTopic(topic);
      },
      create: function(content) {
        this.perform('create', { content });
      }
    });
    this._messagesSubscriptions = {};
    return this.cable;
  }

  subscribeToTopic(topicId) {
    this.subscriptions[topicId] = this.cable.subscriptions.create({
      channel: MESSAGES_CHANNEL,
      topic_id: topicId
    }, {
      connected: () => {
        console.log('cable connected');
      },
      received: (message) => {
        // this.handleReceivedMessage(message);
        ChatActions.gotNewMessage(message);
      }
    });
  }

  unsubscribeFromTopic(topicId) {
    this.subscriptions[topicId].unsubscribe();
    delete this.subscriptions[topicId];
  }

  deinitCable() {
    this._topicsSubscription.unsubscribe();
  }

  get cable() {
    return this._cable;
  }

  get subscriptions() {
    return this._messagesSubscriptions;
  }
}

export default new ChatService();
