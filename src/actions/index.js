import axios from "axios";

const actions = {
  ADD_TASK: "ADD_TASK",
  addTask,
  DELETE_TASK: "DELETE_TASK",
  deleteTask,
  TASK_DONE: "TASK_DONE",
  taskDone,
  MOVE_TASK: "MOVE_TASK",
  moveTask,
  RESIZE_TASK: "RESIZE_TASK",
  resizeTask,
  SUBMIT_EDIT: "SUBMIT_EDIT",
  submitEdit,
  CHANGE_CURRENT_BREAKPOINT: "CHANGE_CURRENT_BREAKPOINT",
  changeCurrentBreakpoint,
  FETCH_TASKS:"FETCH_TASKS",
  fetchTasks,
  CORRECT_COLLISIONS: "CORRECT_COLLISIONS",
  correctCollisions,
  ADJUST_LIMIT:"ADJUST_LIMIT",
  adjustLimit,
  CORRECT_TASKS: "CORRECT_TASKS",
  CORRECT_LIMIT: "CORRECT_LIMIT",
};

function fetchTasks() {
  return {
    type: actions.FETCH_TASKS
  }
}

function addTask(category, taskContent) {
  return {
    type: actions.ADD_TASK,
    task: {
      category,
      content: taskContent
    }
  };
}

function deleteTask(id) {
  return {
    type: actions.DELETE_TASK,
    id
  }
}

function taskDone(task) {
  return {
    type: actions.TASK_DONE,
    task
  }
}


function moveTask(id, x, y) {
  return {
    type: actions.MOVE_TASK,
    task: {
      id,
      newX : x,
      newY : y
    }
  };
}

function submitEdit(id, name, description){
  return {
    type: actions.SUBMIT_EDIT,
    task: {
      id,
      name,
      description
    }
  }
}

function resizeTask(id, width, height) {
  return {
      type: actions.RESIZE_TASK,
      task: {
        id,
        width,
        height
      }
  };
}

function changeCurrentBreakpoint(breakpoint) {
  return {
    type: actions.CHANGE_CURRENT_BREAKPOINT,
    breakpoint : breakpoint
  }
}

function correctCollisions() {
  return {type:actions.CORRECT_COLLISIONS}
}

function adjustLimit() {
  return {type:actions.ADJUST_LIMIT}
}

export default actions;