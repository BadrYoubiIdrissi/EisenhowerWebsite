export var actions = {
  ADD_TASK: "ADD_TASK",
  MOVE_TASK: "MOVE_TASK",
  RESIZE_TASK: "RESIZE_TASK"
};

export function addTask(category, taskContent) {
  return {
    type: actions.ADD_TASK,
    task: {
      category,
      content: taskContent
    }
}