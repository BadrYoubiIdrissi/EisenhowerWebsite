export default function deleteTask(state, action) {
  var tasks = state.filter(task => task._id !== action._id);
  return tasks;
}
