import update from "immutability-helper";
import { categories } from "../../constants";

/**
 * Pure Recursive function that corrects collisions in an array of tasks and a limit object
 * 
 * @param {Object[]} tasks - a list of tasks
 * @param {Object} limit - the urgence and importance limits 
 * 
 * @returns {Object} layout - object that has the new tasks and new limit without collisions.
 * 
 */

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
            // If there is a collision between two tasks, depending on the task we add 1 or 2 grid units to urgence
            if (collision.height === 2 && collision.urgence === task.urgence) {
                nTasks = update(nTasks, { [i]: { urgence: { $set: task.urgence + 2 } } });
            }
            else {
                nTasks = update(nTasks, { [i]: { urgence: { $set: task.urgence + 1 } } });
            }
        }

        // If a post it goes over the urgence limit, move the limit.

        else if ((task.category === categories.N_URGENT_IMPORTANT
            || task.category === categories.N_URGENT_N_IMPORTANT)
            && task.urgence + task.height > limit.urgence) {

            nLimit = update(limit, { urgence: { $set: task.urgence + task.height } });
        }

        // If a task goe beyond the impotance limit (or the max width limit) we move it back before the limit

        else if (task.importance + task.width > limit.importance) {
            nTasks = update(nTasks, { [i]: { importance: { $set: limit.importance - task.width } } });
        }
        else if (task.importance + task.width > limit.maxWidth) {
            nTasks = update(nTasks, { [i]: { importance: { $set: limit.maxWidth - task.width } }});
        }
    }

    // Recursive call only if we changed something.

    if (nTasks !== tasks || nLimit !== limit)
        return correctCollisions(nTasks, nLimit);
    else
        return { tasks, limit };
}
