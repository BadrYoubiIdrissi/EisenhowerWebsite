import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import actions from "./actions";
import layoutMiddleware from "./middleware/layout";
import serverMiddleware from "./middleware/server";
import rootReducer from "./reducers";
import "./styles/css/index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var mainReducer = (state = {}, action) => 
                        action.type === actions.HYDRATE ? action.payload : rootReducer(state, action);

var store = createStore(mainReducer,
    composeEnhancers(applyMiddleware(serverMiddleware,layoutMiddleware))
);

store.dispatch({type : actions.HYDRATE, callback: onDone});

function onDone(){
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
}
