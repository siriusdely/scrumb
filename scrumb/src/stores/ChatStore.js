import { GET_TOPICS
         , GOT_NEW_MESSAGE
         , GOT_NEW_TOPIC } from '../constants/ChatConstants';
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
    case GOT_NEW_MESSAGE:
      const message = action.message;
      const topic = this.findTopic(message.topic_id);
      topic.messages = [...topic.messages, message];
      this.emitChange();
      break;
    case GOT_NEW_TOPIC:
      const topic1 = action.topic;
      this._activeTopic = topic1;
      this._topics = [...this.topics, topic1];
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

  findTopic(topicId) {
    return this.topics.find(
      topic => topic.id === topicId
    );
  };
}

export default new ChatStore();
