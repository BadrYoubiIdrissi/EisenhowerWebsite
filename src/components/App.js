import React from "react";
import Matrix from "./Matrix";
import PostItBlock from "./PostItBlock"
import {categories} from "../constants";

export default class App extends React.Component{
    render(){
        return (
            <div className="app">
                <div id="header">
                    <img src={require("../images/Logo.svg")} alt="logo" className="logo" />
                </div>
                <Matrix/>
                <div id="PostItBlocks">
                    <PostItBlock id={categories.N_URGENT_N_IMPORTANT}/>
                    <PostItBlock id={categories.URGENT_N_IMPORTANT}/>
                    <PostItBlock id={categories.N_URGENT_IMPORTANT}/>
                    <PostItBlock id={categories.URGENT_IMPORTANT}/>
                </div>
            </div>
            
        );
    }
}