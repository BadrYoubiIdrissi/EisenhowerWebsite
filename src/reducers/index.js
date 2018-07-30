import {combineReducers} from "redux"; 
import {layout} from "./layout";
import {doneTasks} from "./doneTasks"

export default combineReducers({
    layout,
    doneTasks
})
