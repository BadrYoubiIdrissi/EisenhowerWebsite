import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";

import actions from "./actions";

import layoutMiddleware from "./middleware/layout";
import serverMiddleware from "./middleware/server";

import "./styles/css/index.css";

// This is the chrome redux devtools extention that enables time travel for debugging and shows all the actions that are dispatched

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* This is the main reducer : contrary to the root reducer it completely replaces the state.
    It is mainly used to connect the user and load their data and also wipe the state when disconnecting */

var mainReducer = (state = {}, action) => 
                        action.type === actions.HYDRATE ? action.payload : rootReducer(state, action);

// We use two custom middleware to handle the layout and the communication with the server

var store = createStore(mainReducer,
    composeEnhancers(applyMiddleware(serverMiddleware,layoutMiddleware))
);

// As the app starts up we hydrate the state with info from the server and then render when the state is done loading

store.dispatch({type : actions.HYDRATE, callback: onDone});

function onDone(){
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
}
