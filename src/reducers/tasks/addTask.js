import update from "immutability-helper";

export default function addTask(state, action) {
  var tasks = state;
  tasks = update(tasks, { $push : [action.task] });
  return tasks;
}
