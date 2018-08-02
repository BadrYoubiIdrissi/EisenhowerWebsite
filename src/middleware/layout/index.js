import { actions } from "../../actions";
import { cols, categories } from "../../constants";
import correctCollisions from "./collision";
import { getMost, getCategory, getUrgenceImportance } from "./getters";
import update from "immutability-helper";

export default store => next => action => {
    var state;
    var limit;
    switch (action.type) {
        case actions.CORRECT_COLLISIONS:
            state = store.getState();
            var tasks = state.tasks.filter(task => !task.done);
            const layout = correctCollisions(tasks, state.limit);
            if (layout.tasks !== tasks){
                store.dispatch({ type: actions.CORRECT_TASKS, tasks: layout.tasks });
            }
                
            if (layout.limit !== state.limit)
                store.dispatch({ type: actions.CORRECT_LIMIT, limit: layout.limit });
            break;

        case actions.MOVE_TASK:

            state = store.getState();
            action.task.category = getCategory(action.task.newX, action.task.newY, state.limit);
            const localPosition = getUrgenceImportance(
                action.task.newX,
                action.task.newY,
                action.task.category,
                state.limit
            );
            action.task.urgence = localPosition.urgence;
            action.task.importance = localPosition.importance;
            next(action);
            break;

        case actions.CHANGE_CURRENT_BREAKPOINT:

            state = store.getState();
            limit = state.limit;
            limit = update(limit, { importance: { $set: Math.floor(cols[action.breakpoint] / 2) } });
            limit = update(limit, { maxWidth: { $set: cols[action.breakpoint] } });
            limit = update(limit, { urgence: { $set: state.limit.urgence === 0 ? 2 : state.limit.urgence } });
            store.dispatch({ type: actions.CORRECT_LIMIT, limit });
            store.dispatch(actions.correctCollisions());
            next(action);
            break;

        case actions.ADJUST_LIMIT:
            state = store.getState();
            limit = state.limit;
            const task = getMost(state.tasks.filter((task) =>
                !task.done && (task.category === categories.N_URGENT_N_IMPORTANT
                || task.category === categories.N_URGENT_IMPORTANT)) , "urgence");
            limit = update(limit, { urgence: { $set: task ? task.urgence + task.height : 1 } });
            if(limit !== state.limit){
                store.dispatch({ type: actions.CORRECT_LIMIT, limit });
                store.dispatch(actions.correctCollisions());
            }
                
            break;
        default:
            next(action);
    }
}