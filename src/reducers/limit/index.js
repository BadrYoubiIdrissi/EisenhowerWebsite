import { actions } from "../../actions";

const defaultLimit = {urgence:0, imporance:0, maxWidth:0};

export default function limit(state =  defaultLimit, action){
    switch(action.type){
        case actions.CORRECT_LIMIT:
            return action.limit
        default:
            return state
    }
    
};