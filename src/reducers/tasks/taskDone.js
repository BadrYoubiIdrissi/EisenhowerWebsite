import update from "immutability-helper";

export default function taskDone(state, action) {
  var tasks = state;
  var taskInd = tasks.findIndex(task => task.id === action.task.id);
  tasks = update(tasks, { [taskInd]: { done: { $set: true } } });
  return tasks;
}
