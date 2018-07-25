import {actions} from "../actions";
import {categories} from "../constants";

export function tasks(state, action) {
  var tasks = state ? state.slice() : null;
  var task;
  switch (action.type) {
    case actions.ADD_TASK:
      var maxUrg = getMax(tasks, "urgence");
            tasks.push({
        id: tasks.length + 1,
                name: action.task.content,
                description: "",
                category: action.task.category,
                width: 2,
                height: 2,
                urgence: maxUrg + 2,
                importance: 0
            });
            return tasks;
        default:
            var defaultTasks = [{
                id: 1,
                name: "Urgent and Important",
                description: "This is a sample urgent and important task",
                category: categories.URGENT_IMPORTANT,
                importance: 2,
                urgence: 0,
                width: 2,
                height: 2
            },{
                id: 2,
                name: "Not Urgent and Important",
                description: "Not so urgent but still important!",
                category: categories.N_URGENT_IMPORTANT,
                importance: 2,
                urgence: 2,
                width: 2,
                height: 2
            },{
                id: 3,
                name: "Urgent and Not Important",
                description: "Wouldn't you like to delegate this?",
                category: categories.URGENT_N_IMPORTANT,
                importance: 0,
                urgence: 0,
                width: 2,
                height: 2
            },{
                id: 4,
                name: "Not Urgent and Not Important",
                description: "Oh come ooooon! There's plenty of time to procrastinate",
                category: categories.N_URGENT_IMPORTANT,
                importance: 0,
                urgence: 2,
                width: 2,
                height: 2
            }];
            return defaultTasks;
    }
}