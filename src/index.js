import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducers";
import "./styles/css/index.css";

var store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);