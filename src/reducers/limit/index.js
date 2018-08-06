import  actions  from "../../actions";

const defaultLimit = {urgence:2, importance:6, maxWidth:12};

export default function limit(state =  defaultLimit, action){
    switch(action.type){
        case actions.CORRECT_LIMIT:
            return action.limit
        default:
            return state
    }
    
};