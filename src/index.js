import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import layoutMiddleware from "./middleware/layout";
import serverMiddleware from "./middleware/server";
import rootReducer from "./reducers";
import "./styles/css/index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(serverMiddleware,layoutMiddleware))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);