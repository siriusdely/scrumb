// import ActionCable from 'actioncable';
import ActionCable from 'action-cable-react-jwt';

import { CABLE_URL,
         MESSAGES_CHANNEL,
         DISCUSSIONS_CHANNEL,
         DISCUSSIONS_URL } from '../constants/ChatConstants';
import ChatActions from '../actions/ChatActions';
import AuthStore from '../stores/AuthStore';

class ChatService {
  getDiscussions() {
    fetch(DISCUSSIONS_URL, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => resp.json())
      .then(discussions => {
        ChatActions.gotDiscussions(discussions);
      }).catch(error => console.log(error) );
  }

  initCable() {
    this._cable = ActionCable.createConsumer(CABLE_URL, AuthStore.jwt);
    this._discussionsSubscription = this.cable.subscriptions.create({
      channel: DISCUSSIONS_CHANNEL
    }, {
      connected: (c) => {
        console.log('connected: ' + c);
      },
      received: (discussion) => {
        // this.handleReceivedDiscussion(discussion);
        ChatActions.gotNewDiscussion(discussion);
      },
      create: function(content) {
        this.perform('create', { content });
      }
    });
    this._messagesSubscriptions = {};
    return this.cable;
  }

  subscribeToDiscussion(discussionId) {
    this.subscriptions[discussionId] = this.cable.subscriptions.create({
      channel: MESSAGES_CHANNEL,
      discussion_id: discussionId
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

  unsubscribeFromDiscussion(discussionId) {
    this.subscriptions[discussionId].unsubscribe();
    delete this.subscriptions[discussionId];
  }

  deinitCable() {
    this._discussionsSubscription.unsubscribe();
  }

  get cable() {
    return this._cable;
  }

  get subscriptions() {
    return this._messagesSubscriptions;
  }
}

export default new ChatService();
