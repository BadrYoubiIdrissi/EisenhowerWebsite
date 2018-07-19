import {actions} from "../actions";

export function tasks(state, action){
    switch(action.type) {
        case actions.ADD_TODO:
            var name = action.task.category;
            const tasks = {...state};
            const quadrantTasks = tasks[name].slice();
            quadrantTasks.push({
                id: quadrantTasks.length+1,
                description: action.task.content,
            });
            tasks[name] = quadrantTasks;
            return tasks;
        default:
            var defaultTasks = {
                urgImp  : [{
                    id: 1,
                    description: "This is a sample urgent and important task"
                }],
                nurgImp : [{
                    id: 1,
                    description: "Not so urgent but still important!"
                }],
                urgNimp : [{
                    id: 1,
                    description: "Wouldn't you like to delegate this?"
                }],
                nurgNimp: [{
                    id: 1,
                    description: "Oh come ooooon! There's plenty of time to procrastinate"
                }],
            };
            return defaultTasks;
    }
}