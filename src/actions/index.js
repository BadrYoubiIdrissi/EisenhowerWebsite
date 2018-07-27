export var actions = {
  ADD_TASK: "ADD_TASK",
  MOVE_TASK: "MOVE_TASK",
  RESIZE_TASK: "RESIZE_TASK",
  CHANGE_CURRENT_BREAKPOINT: "CHANGE_CURRENT_BREAKPOINT",
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

export function moveTask(id, x, y) {
  return {
    type: actions.MOVE_TASK,
    task: {
      id,
      newX : x,
      newY : y
    }
  };
}

export function changeCurrentBreakpoint(breakpoint) {
  return {
    type: actions.CHANGE_CURRENT_BREAKPOINT,
    breakpoint : breakpoint
  }
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
