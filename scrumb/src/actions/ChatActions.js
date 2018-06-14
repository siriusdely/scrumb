import { GET_TOPICS, GOT_NEW_TOPIC } from '../constants/ChatConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  gotTopics: topics => {
    AppDispatcher.dispatch({
      actionType: GET_TOPICS,
      topics: topics
    });
  },

  gotNewTopic: topic => {
    AppDispatcher.dispatch({
      actionType: GOT_NEW_TOPIC,
      topic: topic
    });
  }
}
