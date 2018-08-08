import Notifications from "react-notification-system-redux";

export function notifySuccess(store, message) {
   if (message) {
      store.dispatch(
         Notifications.success({
            message,
            position: "br"
         })
      );
   }
}
export function notifyFailure(store, error) {
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