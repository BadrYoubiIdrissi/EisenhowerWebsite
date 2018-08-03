
const actions = {
  ADD_TASK: "ADD_TASK",
  
  DELETE_TASK: "DELETE_TASK",
  
  TASK_DONE: "TASK_DONE",
  MOVE_TASK: "MOVE_TASK",
  RESIZE_TASK: "RESIZE_TASK",
  SUBMIT_EDIT: "SUBMIT_EDIT",
  CHANGE_CURRENT_BREAKPOINT: "CHANGE_CURRENT_BREAKPOINT",
  FETCH_TASKS:"FETCH_TASKS",
  CORRECT_COLLISIONS: "CORRECT_COLLISIONS",
  ADJUST_LIMIT:"ADJUST_LIMIT",
  CORRECT_TASKS: "CORRECT_TASKS",
  CORRECT_LIMIT: "CORRECT_LIMIT",
  SYNC_TASKS: "SYNC_TASKS",
  addTask,
  deleteTask,
  taskDone,
  moveTask,
  resizeTask,
  submitEdit,
  changeCurrentBreakpoint,
  correctCollisions,
  adjustLimit,
  fetchTasks
};

function fetchTasks() {
  return {
    type: actions.FETCH_TASKS
  }
}

function addTask(category, taskName) {
  var task = {
    name: taskName,
    description: "",
    category: category,
    width: 2,
    height: 2,
    urgence: 0,
    importance: 0,
    done: false
  };
  return {
    type: actions.ADD_TASK,
    task
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