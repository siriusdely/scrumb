import { GET_DISCUSSIONS
         , GOT_NEW_MESSAGE
         , GOT_NEW_DISCUSSION } from '../constants/ChatConstants';
import BaseStore from './BaseStore';

class ChatStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._actionsToSubscribe.bind(this));
    this._discussions = [];
    this._activeDiscussion = null;
  }

  _actionsToSubscribe(action) {
    switch(action.actionType) {
    case GET_DISCUSSIONS:
      this._discussions = action.discussions;
      this._activeDiscussion = this.discussions[0];
      this.emitChange();
      break;
    case GOT_NEW_MESSAGE:
      const message = action.message;
      const discussion = this.findDiscussion(message.discussion_id);
      discussion.messages = [...discussion.messages, message];
      this.emitChange();
      break;
    case GOT_NEW_DISCUSSION:
      const discussion1 = action.discussion;
      this._activeDiscussion = discussion1;
      this._discussions = [...this.discussions, discussion1];
      this.emitChange();
      break;
    default:
      break;
    }
  }

  get discussions() {
    return this._discussions;
  }

  get currentDiscussion() {
    return this._activeDiscussion;
  }

  findDiscussion(discussionId) {
    return this.discussions.find(
      discussion => discussion.id === discussionId
    );
  };
}

export default new ChatStore();
