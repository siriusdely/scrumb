import { GET_SCRUMS, GET_SCRUM } from '../constants/ScrumConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  gotScrums: function(scrums) {
    AppDispatcher.dispatch({
      actionType: GET_SCRUMS,
      scrums: scrums
    });
  },

  gotScrum: function(scrum) {
    AppDispatcher.dispatch({
      actionType: GET_SCRUM,
      scrum: scrum
    });
  }
}
