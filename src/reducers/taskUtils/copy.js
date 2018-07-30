import {copy} from "../../utils";

export default function copyTasks(tasks) {
  return tasks.map(task => copy(task));
}
