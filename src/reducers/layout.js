import {actions} from "../actions";
import { resizeTask, moveTask, addTask} from "./taskUtils";
import { changeCurrentBreakpoint, defaultLayout } from "./layoutUtils";
import { createReducer } from "./reducerUtils";

var layoutObj = {};
layoutObj[actions.ADD_TASK] = addTask;
layoutObj[actions.MOVE_TASK] = moveTask;
layoutObj[actions.RESIZE_TASK] = resizeTask;
layoutObj[actions.CHANGE_CURRENT_BREAKPOINT] = changeCurrentBreakpoint;

export const layout = createReducer(defaultLayout(), layoutObj);