import update from "immutability-helper";

export default function taskDone(state, action) {
  var tasks = state;
  var taskInd = tasks.findIndex(task => task._id === action.task._id);
  tasks = update(tasks, { [taskInd]: { done: { $set: true } } });
  return tasks;
}
