export var actions = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  TASK_DONE: "TASK_DONE",
  MOVE_TASK: "MOVE_TASK",
  RESIZE_TASK: "RESIZE_TASK",
  SUBMIT_EDIT: "SUBMIT_EDIT",
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

export function deleteTask(id) {
  return {
    type: actions.DELETE_TASK,
    id
  }
}

export function taskDone(task) {
  return {
    type: actions.TASK_DONE,
    task
  }
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

export function submitEdit(id, name, description){
  return {
    type: actions.SUBMIT_EDIT,
    task: {
      id,
      name,
      description
    }
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

export function changeCurrentBreakpoint(breakpoint) {
  return {
    type: actions.CHANGE_CURRENT_BREAKPOINT,
    breakpoint : breakpoint
  }
}