import copyTasks from "./copy";

export default function submitEdit(state, action) {
  const tasks = copyTasks(state.tasks);
  const task = tasks.find(task => task.id === action.task.id);
  task.name = action.task.name;
  task.description = action.task.description;
  return {
    limit: state.limit,
    tasks,
    breakpoint: state.breakpoint
  };
}
