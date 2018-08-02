import update from "immutability-helper";

export default function resizeTask(state, action){
    var tasks = state;
    var taskInd = tasks.findIndex(task => (task.id === action.task.id));
    tasks = update(tasks, { [taskInd]: { width: { $set: action.task.width } } });
    tasks = update(tasks, { [taskInd]: { height: { $set: action.task.height } } });
    return tasks;
  }
  