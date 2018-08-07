import {combineReducers} from "redux"; 
import limit from "./limit";
import tasks from "./tasks";
import breakpoint from "./breakpoint";
import user from "./user";
import {reducer as notifications} from "react-notification-system-redux";

// The root state has this general shape : 

export default combineReducers({
    limit,
    tasks,
    breakpoint,
    notifications,
    user
})