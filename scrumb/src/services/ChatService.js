import ActionCable from 'actioncable';

import { CABLE_URL, TOPICS_CHANNEL, TOPICS_URL } from '../constants/ChatConstants';
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
    this._cable = ActionCable.createConsumer(CABLE_URL);
    this._topicsSubscription = this.cable.subscriptions.create({
      channel: TOPICS_CHANNEL
    }, {
      connected: (c) => {
        console.log('connected: ' + c);
      },
      received: (topic) => {
        ChatActions.gotNewTopic(topic);
        // this.handleReceivedTopic(topic);
      },
      create: function(content) {
        this.perform('create', { content });
      }
    });
   return this.cable;
  }

  deinitCable() {
    this._topicsSubscription.unsubscribe();
  }

  get cable() {
    return this._cable;
  }
}

export default new ChatService();
