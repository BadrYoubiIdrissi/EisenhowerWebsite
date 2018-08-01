import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import promiseMiddleware from "redux-promise";
import rootReducer from "./reducers";
import "./styles/css/index.css";


var createStoreWithMiddleWare = applyMiddleware(promiseMiddleware)(createStore);
var store = createStoreWithMiddleWare(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);