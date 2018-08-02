import axios from "axios";
import actions from "../../actions";

export default store => next => action => {
   switch (action.type) {
      case actions.ADD_TASK:
         axios.post("/api/tasks", action.task)
            .then(res => {
               action.task.id = res.data.id;
               next(action);
            }).catch(err => console.error(err));
         break;

      case actions.DELETE_TASK:
         console.log(action);
         axios.delete("/api/tasks", { params : {id : action.id}}).then( res => {
            next(action);
            console.log(res);
         }
         );
         break;

      case actions.SYNC_TASKS:
         var state = store.getState();
         axios.post("/api/tasks", state.tasks)
         break;
      
      case actions.FETCH_TASKS:
         axios.get("/api/tasks")
         .then(res => {
               action.tasks = res.data;
               next(action);
         });
         break;
      
      case actions.CORRECT_TASKS:
      case actions.MOVE_TASK:
      case actions.RESIZE_TASK:
      case actions.SUBMIT_EDIT:
      case actions.TASK_DONE:
         next(action);
         store.dispatch({type: actions.SYNC_TASKS});
         break;

      default:
         next(action);
   }
}