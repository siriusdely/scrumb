import { GET_SCRUMS, GET_SCRUM, GOT_TODAY } from '../constants/ScrumConstants';
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
  },

  gotToday: function(today) {
    AppDispatcher.dispatch({
      actionType: GOT_TODAY,
      today: today
    });
  }
}
