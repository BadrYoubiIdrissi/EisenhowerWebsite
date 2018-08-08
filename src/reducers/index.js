import {combineReducers} from "redux"; 
import limit from "./limit";
import tasks from "./tasks";
import breakpoint from "./breakpoint";
import user from "./user";
import {reducer as notifications} from "react-notification-system-redux";

//  In the beginning the reducers had most of the logic (hence the speration of files)
//  After the implementation of the middleware, most of the logic went there. 

// The root state has this general shape : 

export default combineReducers({
    limit,
    tasks,
    breakpoint,
    notifications,
    user
})

/*  
    - limit : object that has the shape :
        { 
            urgence : Number, 
            importance : Number, 
            maxWidth: Number 
        }
        this object specifies the limit between urgent / not urgent and important / not important and also
        the width of the screen. All numbers are in grid units. 
    - tasks : array of tasks. See the backend model for more details about the task object.
    - breakpoint : this is the current breakpoint (ie category of screen width). 
        The possible values "lg" (large) "md" (medium) "sm" (small) and "xs" "extra small"
    - notifications : this contains the list of notifications currently displayed on screen.
    - user : contains the current username of the person logged in.

*/