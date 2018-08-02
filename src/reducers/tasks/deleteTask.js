export default function deleteTask(state, action) {
  var tasks = state.filter(task => task.id !== action.id);
  return tasks;
}
