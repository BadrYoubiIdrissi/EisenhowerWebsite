import {copy} from "../../utils";

export default function fetchTasks(state, action) {
    const tasks = action.payload.data.map(task => {
        var t = copy(task);
        t["id"] = t["_id"];
        delete t["_id"];
        return t
    });
    return {
        limit: state.limit,
        breakpoint: state.breakpoint,
        tasks
    }
}