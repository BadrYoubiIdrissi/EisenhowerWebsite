import {categories} from "../../constants";
import {getMost} from "./getters";
import {correctCollisions} from "./collision"; 

export default function adjustLimit(tasks,limit){
    const task = getMost(tasks.filter((task) => task.category === categories.N_URGENT_N_IMPORTANT
                                             || task.category === categories.N_URGENT_N_IMPORTANT)
                        ,"urgence");
    limit.urgence= task ? task.urgence+task.height : 2;
    correctCollisions(tasks, limit);
}