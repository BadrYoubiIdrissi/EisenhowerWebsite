import {actions} from "../actions";

export function doneTasks(state = [], action){
    var doneTasks = state.slice();
    switch(action.type){
        case actions.TASK_DONE:
            doneTasks.push(action.task)
            return doneTasks;
        default:
            return state;
    }
}