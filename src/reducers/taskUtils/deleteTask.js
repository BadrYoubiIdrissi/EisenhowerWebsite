import adjustLimit from "./adjustLimit";
import {copy} from "../../utils";

export default function deleteTask(state, action) {
  var limit = copy(state.limit);
  var tasks = state.tasks.filter(task => task.id !== action.id);
  adjustLimit(tasks, limit);
  return {
    limit,
    tasks,
    breakpoint: state.breakpoint
  };
}
