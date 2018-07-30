export default function deleteTask(state, action) {
  var tasks = state.tasks.filter(task => task.id !== action.id);
  return {
    limit: state.limit,
    tasks,
    breakpoint: state.breakpoint
  };
}
