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
  };
}

export function moveTask(id, urgence, importance) {
  return {
    type: actions.MOVE_TASK,
    task: {
      id,
      urgence,
      importance
    }
  };
}

export function resizeTask(id, width, height) {
  return {
      type: actions.RESIZE_TASK,
      task: {
        id,
        width,
        height
      }
  };
}
