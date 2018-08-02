import {combineReducers} from "redux"; 
import limit from "./limit";
import tasks from "./tasks";
import breakpoint from "./breakpoint";

export default combineReducers({
    limit,
    tasks,
    breakpoint
})

