import {categories} from "../../constants";

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