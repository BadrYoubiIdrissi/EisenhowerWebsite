import {actions} from "../../actions";

export default function breakpoint(state = "lg", action) {
    switch(action.type){
        case actions.CHANGE_CURRENT_BREAKPOINT:
            return action.breakpoint
        default:
            return state
    }
}