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

tasks[actions.FETCH_TASKS] = fetchTasks;
tasks[actions.ADD_TASK] = addTask;
tasks[actions.DELETE_TASK] = deleteTask
tasks[actions.MOVE_TASK] = moveTask;
tasks[actions.RESIZE_TASK] = resizeTask;
tasks[actions.SUBMIT_EDIT] = submitEdit;
tasks[actions.CORRECT_TASKS] = correctTasks;
tasks[actions.TASK_DONE] = taskDone;

export default createReducer([], tasks);