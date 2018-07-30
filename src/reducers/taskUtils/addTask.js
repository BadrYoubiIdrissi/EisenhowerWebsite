import {correctCollisions} from "./collision";
import copyTasks from "./copy";
import {copy} from "../../utils";
import sha1 from "sha1";

export default function addTask(state, action) {
  const tasks = copyTasks(state.tasks);
  const limit = copy(state.limit);
  tasks.push({
    id: sha1(String((new Date().getTime())+tasks.length + 1)),
    name: action.task.content,
    description: "",
    category: action.task.category,
    width: 2,
    height: 2,
    urgence: 0,
    importance: 0
  });
  correctCollisions(tasks, limit);
  return {
    limit,
    tasks,
    breakpoint: state.breakpoint
  };
}
