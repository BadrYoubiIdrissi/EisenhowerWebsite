import { categories, cols} from "../constants";
import { correctCollisions } from "./taskUtils";

export function getCategory(x ,y , limit){
  if (y >= limit.urgence){
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

export function changeCurrentBreakpoint(state, action) {
    var tasks = state.tasks.slice();
    var limit = {...state.limit};
    limit.importance = Math.floor(cols[action.breakpoint]/2);
    limit.maxWidth = cols[action.breakpoint];
    limit.urgence = state.limit.urgence === 0 ? 2 : state.limit.urgence;
    correctCollisions(tasks, limit);
    return {
        limit,
        breakpoint : action.breakpoint,
        tasks,
    }
}

export function defaultLayout() {
    return {
        limit: {
            urgence: 2,
            importance: 6,
            maxWidth: 0
        },
        tasks : [{
            id: "1",
            name: "Urgent and Important",
            description: "This is a sample urgent and important task",
            category: categories.URGENT_IMPORTANT,
            importance: 0,
            urgence: 0,
            width: 2,
            height: 2
          },
          {
            id: "2",
            name: "Not Urgent and Important",
            description: "Not so urgent but still important!",
            category: categories.N_URGENT_IMPORTANT,
            importance: 0,
            urgence: 0,
            width: 2,
            height: 2
          },
          {
            id: "3",
            name: "Urgent and Not Important",
            description: "Wouldn't you like to delegate this?",
            category: categories.URGENT_N_IMPORTANT,
            importance: 0,
            urgence: 0,
            width: 2,
            height: 2
          },
          {
            id: "4",
            name: "Not Urgent and Not Important",
            description: "Oh come ooooon! There's plenty of time to procrastinate",
            category: categories.N_URGENT_N_IMPORTANT,
            importance: 0,
            urgence: 0,
            width: 2,
            height: 2
          }],
        breakpoint : "lg"
    }
}
