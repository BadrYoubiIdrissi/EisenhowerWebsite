import {categories} from "../constants";
import {getCategory, getOrigins} from "./layoutUtils";

export function getMost(tasks, key, min = 0) {
  var max = min;
  var maxTask = null;
  tasks.forEach(task => {
    if (task[key] >= max) {
      max = task[key];
      maxTask = task;
    }
  });
  return maxTask;
}

export function getMax(tasks, key, min=0){
  return getMost(tasks, key, min)[key];
}
  return getMost(tasks, key, min)[key];
}

export function getUrgenceImportance(x, y, category, limit){
  var origins = getOrigins(limit);
  return {
    importance : x - origins[category].importance,
    urgence: y - origins[category].urgence
  } 
}

export function correctCollisions(tasks, limit){
  tasks.forEach(task => {
      var modification = false;
      var collision = tasks.find(t => task.id !== t.id && task.category === t.category
                    && t.urgence <= task.urgence && task.urgence < t.urgence + t.height
                    && t.importance <= task.importance && task.importance < t.importance + t.width );
      if(collision){
        if (collision.height === 2 && collision.urgence === task.urgence){
          task.urgence += 2;
        }
        else{
          task.urgence += 1;
        }
        modification = true;
      }
      if((task.category === categories.N_URGENT_IMPORTANT 
          || task.category === categories.N_URGENT_N_IMPORTANT)
          && task.urgence+task.height > limit.urgence){
        limit.urgence = task.urgence+task.height;
        modification = true;
      }
      if(task.importance+task.width > limit.importance){
        task.importance = limit.importance - task.width;
        modification = true
      }
      if(task.importance+task.width > limit.maxWidth){
        task.importance = limit.maxWidth - task.width;
        modification = true
      }
      if(modification)
        correctCollisions(tasks, limit);
  })
}

export function resizeTask(state, action){
  var tasks = state.tasks.slice();
  var limit = {...state.limit};
  var task = tasks.find(task => (task.id === action.task.id));
  task.width = action.task.width;
  task.height = action.task.height;
  correctCollisions(tasks, limit);
  return {
    tasks,
    limit: state.limit,
    breakpoint: state.breakpoint
  };
}

export function addTask(state, action){
  var tasks = state.tasks.slice();
  var limit = {...state.limit};
  tasks.push({
    id: String(tasks.length + 1),
    name: action.task.content,
    description: "",
    category: action.task.category,
    width: 2,
    height: 2,
    urgence: 0,
    importance: 0
  });
  correctCollisions(tasks, limit);
  return {
    limit,
    tasks,
    breakpoint : state.breakpoint
  };
}

