import {getCategory} from "../layoutUtils";
import {correctCollisions} from "./collision";
import {getUrgenceImportance} from "./getters";
import copyTasks from "./copy";
import {copy} from "../../utils";
import adjustLimit from "./adjustLimit";

export default function moveTask(state, action) {
  var tasks = copyTasks(state.tasks);
  var limit = copy(state.limit);
  var task = tasks.find(task => task.id === action.task.id);
  task.category = getCategory(action.task.newX, action.task.newY, state.limit);
  const localPosition = getUrgenceImportance(
    action.task.newX,
    action.task.newY,
    task.category,
    state.limit
  );
  task.urgence = localPosition.urgence;
  task.importance = localPosition.importance;
  correctCollisions(tasks, limit);
  adjustLimit(tasks, limit);
  return {
    tasks,
    limit,
    breakpoint: state.breakpoint
  };
}
