import { GET_TOPICS
         , GOT_NEW_MESSAGE
         , GOT_NEW_TOPIC } from '../constants/ChatConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  gotTopics: topics => {
    AppDispatcher.dispatch({
      actionType: GET_TOPICS,
      topics: topics
    });
  },

  gotNewMessage: message => {
    AppDispatcher.dispatch({
      actionType: GOT_NEW_MESSAGE,
      message: message
    });
  },

  gotNewTopic: topic => {
    AppDispatcher.dispatch({
      actionType: GOT_NEW_TOPIC,
      topic: topic
    });
  }
}
