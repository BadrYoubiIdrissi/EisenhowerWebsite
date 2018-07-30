import {correctCollisions} from "./collision";
import copyTasks from "./copy";
import {copy} from "../../utils";

export default function resizeTask(state, action){
    const tasks = copyTasks(state.tasks);
    const limit = copy(state.limit);
    const task = tasks.find(task => (task.id === action.task.id));
    task.width = action.task.width;
    task.height = action.task.height;
    correctCollisions(tasks, limit);
    return {
      tasks,
      limit: state.limit,
      breakpoint: state.breakpoint
    };
  }
  