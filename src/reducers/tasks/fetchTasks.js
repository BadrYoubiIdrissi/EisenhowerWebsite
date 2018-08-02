export default function fetchTasks(state, action) {
    const tasks = action.payload.data.map(task => {
        var t = JSON.parse(JSON.stringify(task));
        t["id"] = t["_id"];
        delete t["_id"];
        return t
    });
    return tasks;
}