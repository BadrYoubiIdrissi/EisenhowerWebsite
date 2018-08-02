import sha1 from "sha1";
import update from "immutability-helper";

export default function addTask(state, action) {
  var tasks = state;
  tasks = update(tasks, { $push : [{
    id: sha1(String((new Date().getTime())+tasks.length + 1)),
    name: action.task.content,
    description: "",
    category: action.task.category,
    width: 2,
    height: 2,
    urgence: 0,
    importance: 0
  }] });
  return tasks;
}
