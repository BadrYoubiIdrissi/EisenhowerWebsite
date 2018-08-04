import update from "immutability-helper";

export default function submitEdit(state, action) {
  var tasks = state;
  var taskInd = tasks.findIndex(task => task._id === action.task._id);
  tasks = update(tasks, { [taskInd]: { name: { $set: action.task.name } } });
  tasks = update(tasks, { [taskInd]: { description: { $set: action.task.description } } });

  return tasks;
}
