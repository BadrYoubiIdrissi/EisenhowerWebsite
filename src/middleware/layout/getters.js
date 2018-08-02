import { categories } from "../../constants";

export function getUrgenceImportance(x, y, category, limit) {
  var origins = getOrigins(limit);
  return {
    importance: x - origins[category].importance,
    urgence: y - origins[category].urgence
  };
}

export function getCategory(x, y, limit) {
  if (y >= limit.urgence) {
    if (x >= limit.importance)
      return categories.URGENT_IMPORTANT
    else
      return categories.URGENT_N_IMPORTANT
  } else {
    if (x >= limit.importance)
      return categories.N_URGENT_IMPORTANT
    else
      return categories.N_URGENT_N_IMPORTANT
  }
}


export function getOrigins(limit) {
  const origins = {};
  origins[categories.N_URGENT_N_IMPORTANT] = {
    urgence: 0,
    importance: 0
  };
  origins[categories.N_URGENT_IMPORTANT] = {
    urgence: 0,
    importance: limit.importance
  };
  origins[categories.URGENT_N_IMPORTANT] = {
    urgence: limit.urgence,
    importance: 0
  };
  origins[categories.URGENT_IMPORTANT] = {
    urgence: limit.urgence,
    importance: limit.importance
  };
  return origins;
}

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

export function getMax(tasks, key, min = 0) {
  return getMost(tasks, key, min)[key];
}