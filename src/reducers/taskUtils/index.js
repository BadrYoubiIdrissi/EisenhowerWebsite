import {correctCollisions} from "./collision";
import fetchTasks from "./fetchTasks";
import addTask from "./addTask";
import deleteTask from "./deleteTask";
import moveTask from "./moveTask";
import resizeTask from "./resizeTask";
import submitEdit from "./submitEdit";
import {getMax, getMost, getUrgenceImportance} from "./getters";
import copyTasks from "./copy";

export {
  correctCollisions,
  fetchTasks,
  addTask, 
  copyTasks, 
  deleteTask, 
  getMax, 
  getMost, 
  getUrgenceImportance,
  moveTask,
  resizeTask,
  submitEdit
};