import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import promiseMiddleware from "redux-promise";
import layoutMiddleware from "./middleware/layout";
import rootReducer from "./reducers";
import "./styles/css/index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(promiseMiddleware, layoutMiddleware))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);