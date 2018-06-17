import { GET_DISCUSSIONS
         , GOT_NEW_MESSAGE
         , GOT_NEW_DISCUSSION } from '../constants/ChatConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  gotDiscussions: discussions => {
    AppDispatcher.dispatch({
      actionType: GET_DISCUSSIONS,
      discussions: discussions
    });
  },

  gotNewMessage: message => {
    AppDispatcher.dispatch({
      actionType: GOT_NEW_MESSAGE,
      message: message
    });
  },

  gotNewDiscussion: discussion => {
    AppDispatcher.dispatch({
      actionType: GOT_NEW_DISCUSSION,
      discussion: discussion
    });
  }
}
