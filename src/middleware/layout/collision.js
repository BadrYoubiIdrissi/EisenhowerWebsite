import update from "immutability-helper";
import { categories } from "../../constants";

export default function correctCollisions(tasks, limit) {
    var nLimit = limit;
    var nTasks = tasks;
    const collisionCondition = t => task._id !== t._id && task.category === t.category
                                    && t.urgence <= task.urgence && task.urgence < t.urgence + t.height
                                    && t.importance <= task.importance && task.importance < t.importance + t.width;
    for (var i = 0; i < nTasks.length; i++) {
        var task = nTasks[i];
        var collision = nTasks.find(collisionCondition);
        if (collision) {
            if (collision.height === 2 && collision.urgence === task.urgence) {
                nTasks = update(nTasks, { [i]: { urgence: { $set: task.urgence + 2 } } });
            }
            else {
                nTasks = update(nTasks, { [i]: { urgence: { $set: task.urgence + 1 } } });
            }
        }
        else if ((task.category === categories.N_URGENT_IMPORTANT
            || task.category === categories.N_URGENT_N_IMPORTANT)
            && task.urgence + task.height > limit.urgence) {

            nLimit = update(limit, { urgence: { $set: task.urgence + task.height } });
        }
        else if (task.importance + task.width > limit.importance) {
            nTasks = update(nTasks, { [i]: { importance: { $set: limit.importance - task.width } } });
        }
        else if (task.importance + task.width > limit.maxWidth) {
            nTasks = update(nTasks, { [i]: { importance: { $set: limit.maxWidth - task.width } }});
        }
    }
    if (nTasks !== tasks || nLimit !== limit)
        return correctCollisions(nTasks, nLimit);
    else
        return { tasks, limit };
}
