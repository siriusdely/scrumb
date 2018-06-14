import { GET_TOPICS, GOT_NEW_TOPIC } from '../constants/ChatConstants';
import BaseStore from './BaseStore';

class ChatStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._actionsToSubscribe.bind(this));
    this._topics = [];
    this._activeTopic = null;
  }

  _actionsToSubscribe(action) {
    switch(action.actionType) {
    case GET_TOPICS:
      this._topics = action.topics;
      this._activeTopic = this.topics[0];
      this.emitChange();
      break;
    case GOT_NEW_TOPIC:
      const topic = action.topic;
      this._activeTopic = topic;
      this._topics = [...this.topics, topic];
      this.emitChange();
      break;
    default:
      break;
    }
  }

  get topics() {
    return this._topics;
  }

  get currentTopic() {
    return this._activeTopic;
  }
}

export default new ChatStore();
