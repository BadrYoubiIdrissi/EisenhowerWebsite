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
