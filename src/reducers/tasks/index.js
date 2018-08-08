import fetchTasks from "./fetchTasks";
import addTask from "./addTask";
import deleteTask from "./deleteTask";
import moveTask from "./moveTask";
import resizeTask from "./resizeTask";
import submitEdit from "./submitEdit";
import correctTasks from "./correctTasks";
import taskDone from "./taskDone";
import { createReducer } from "../reducerUtils";
import actions from "../../actions";

var tasks = {}

//  This is the most used reducer and so to facilitate readability
//  instead of making switch statements we create the reducer from an object
//  This reducer just redirects the state and action to the correct reducer

tasks[actions.FETCH_TASKS] = fetchTasks;
tasks[actions.ADD_TASK] = addTask;
tasks[actions.DELETE_TASK] = deleteTask
tasks[actions.MOVE_TASK] = moveTask;
tasks[actions.RESIZE_TASK] = resizeTask;
tasks[actions.SUBMIT_EDIT] = submitEdit;
tasks[actions.CORRECT_TASKS] = correctTasks;
tasks[actions.TASK_DONE] = taskDone;

export default createReducer([], tasks);