import axios from "axios";
import actions from "../../actions";
import Notifications from "react-notification-system-redux";

function notifySuccess(store, message) {
  if (message) {
    store.dispatch(
      Notifications.success({
        message,
        position: "br"
      })
    );
  }
}
function notifyFailure(store, error) {
  if (error.message) {
    store.dispatch(
      Notifications.error({
        message: error.message,
        position: "br"
      })
    );
  } else if (error.errors) {
    for (var key in error.errors) {
      store.dispatch(
        Notifications.error({
          message: error.errors[key].message,
          position: "br"
        })
      );
    }
  }
}

export default store => next => action => {
  switch (action.type) {
    case actions.HYDRATE:
      axios.get("/api/user").then(res => {
        var state = store.getState();
        if (res.data.user) {
          axios.get("/api/tasks").then(taskRes => {
            action.payload = {
              limit: state.limit,
              tasks: taskRes.data,
              breakpoint: state.breakpoint,
              user: res.data.user,
              notifications: state.notifications
            };
            next(action);
            if(action.callback) action.callback();
            notifySuccess(store, "Connected as: " + res.data.user);
          });
        } else {
          action.payload = {
            limit: state.limit,
            tasks: [],
            breakpoint: state.breakpoint,
            user: res.data.user,
            notifications: state.notifications
          };
          next(action);
          if(action.callback) action.callback();
        }
      });
      break;
    case actions.LOGOUT:
      axios
        .get("/api/logout")
        .then(res => store.dispatch({ type: actions.HYDRATE }));
      break;
    case actions.ADD_TASK:
      axios
        .post("/api/tasks/add", action.task)
        .then(res => {
          action.task._id = res.data._id;
          next(action);
        })
        .catch(err => notifyFailure(store, err.response.data));
      break;

    case actions.DELETE_TASK:
      console.log(action);
      axios.delete("/api/tasks", { params: { _id: action._id } }).then(res => {
        next(action);
      });
      break;

    case actions.SYNC_TASKS:
      var state = store.getState();
      axios
        .post("/api/tasks/sync", state.tasks)
        .catch(err => notifyFailure(store, err.response.data));
      break;

    case actions.FETCH_TASKS:
      axios
        .get("/api/tasks")
        .then(res => {
          action.tasks = res.data;
          next(action);
        })
        .catch(err => notifyFailure(store, err.response.data));
      break;

    case actions.CORRECT_TASKS:
    case actions.MOVE_TASK:
    case actions.RESIZE_TASK:
    case actions.SUBMIT_EDIT:
    case actions.TASK_DONE:
      next(action);
      store.dispatch({ type: actions.SYNC_TASKS });
      break;

    case actions.ATTEMPT_LOGIN:
      axios
        .post("/api/login", action.user)
        .then(res => {
          store.dispatch({
            type: actions.SUCCESSFUL_LOGIN,
            user: action.user.username
          });
          store.dispatch({
            type: actions.HYDRATE
          });
        })
        .catch(err => notifyFailure(store, err.response.data));
      break;
    case actions.ATTEMPT_REGISTER:
      axios
        .post("/api/register", action.user)
        .then(res => {
          store.dispatch({
            type: actions.ATTEMPT_LOGIN,
            user: action.user
          });
          store.dispatch({
            type: actions.HYDRATE
          });
        })
        .catch(err => notifyFailure(store, err.response.data));
      break;

    default:
      next(action);
  }
};
