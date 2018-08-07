
// All the actions and action creators are in this object

const actions = {
  HYDRATE:"HYDRATE",
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
  ATTEMPT_LOGIN: "ATTEMPT_LOGIN",
  SUCCESSFUL_LOGIN:"SUCCESSFUL_LOGIN",
  ATTEMPT_REGISTER:"ATTEMPT_REGISTER",
  SUCCESSFUL_REGISTER: "SUCCESSFUL_REGISTER",
  LOGOUT: "LOGOUT",
  addTask,
  deleteTask,
  taskDone,
  moveTask,
  resizeTask,
  submitEdit,
  changeCurrentBreakpoint,
  correctCollisions,
  adjustLimit,
  fetchTasks,
  attemptLogin,
  attemptRegister,
  logout
};

function logout() {
  return {
    type: actions.LOGOUT
  }
}

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

function deleteTask(_id) {
  return {
    type: actions.DELETE_TASK,
    _id
  }
}

function taskDone(task) {
  return {
    type: actions.TASK_DONE,
    task
  }
}


function moveTask(_id, x, y) {
  return {
    type: actions.MOVE_TASK,
    task: {
      _id,
      newX : x,
      newY : y
    }
  };
}

function submitEdit(_id, name, description){
  return {
    type: actions.SUBMIT_EDIT,
    task: {
      _id,
      name,
      description
    }
  }
}

function resizeTask(_id, width, height) {
  return {
      type: actions.RESIZE_TASK,
      task: {
        _id,
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

function attemptLogin(username, password) {
  return {
    type:actions.ATTEMPT_LOGIN,
    user: {
      username,
      password
    }
  }
}

function attemptRegister(username, password) {
  return {
    type:actions.ATTEMPT_REGISTER,
    user: {
      username,
      password
    }
  }
}

export default actions;