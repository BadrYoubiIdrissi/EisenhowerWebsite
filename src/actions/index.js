export var actions = {
    ADD_TODO: 'ADD_TODO'
} 

export function addTask(category, taskContent){
    return {
        type : actions.ADD_TODO,
        task : {
            category,
            content: taskContent
        }
    }
}