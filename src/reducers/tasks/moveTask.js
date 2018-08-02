import update from "immutability-helper";

export default function moveTask(state, action) {
  var tasks = state;
  var taskInd = tasks.findIndex(task => task.id === action.task.id);
  tasks = update(tasks, { [taskInd]: { category: { $set: action.task.category } } });
  tasks = update(tasks, { [taskInd]: { urgence: { $set: action.task.urgence } } });
  tasks = update(tasks, { [taskInd]: { importance: { $set: action.task.importance } } });
  return tasks;
}
