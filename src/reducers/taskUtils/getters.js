import { getOrigins } from "../layoutUtils";

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

export function getUrgenceImportance(x, y, category, limit) {
  var origins = getOrigins(limit);
  return {
    importance: x - origins[category].importance,
    urgence: y - origins[category].urgence
  };
}
