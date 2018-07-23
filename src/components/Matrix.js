import React from "react";
import ReactDOM from "react-dom";
import {Responsive, WidthProvider} from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

export default class Matrix extends React.Component{
    constructor(props){
      super(props)
      this.default = {
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
      }
      this.state = {
        currentBreakpoint : "lg",
        rowHeight : 130
      }
    }
    componentDidUpdate(prevProps,prevState){
      var node = ReactDOM.findDOMNode(this);
      if (node instanceof HTMLElement){
        var rowHeight = node.offsetWidth / this.default.cols[this.state.currentBreakpoint]/2;
        if(prevState.rowHeight !== rowHeight){
          this.setState({rowHeight});
        }
      } 
    }
    onBreakPointChange = (breakpoint) => {
      this.setState({currentBreakpoint:breakpoint})
    }
    render() {
        // layout is an array of objects, see the demo for more complete usage
        var layouts = {
          lg : [
          {i: 'a', x: 0, y: 0, w: 1, h: 1},
          {i: 'b', x: 1, y: 0, w: 1, h: 1},
          {i: 'c', x: 4, y: 0, w: 1, h: 1}
          ]
        };
        return (
        <div id="Matrix">        
          <ResponsiveGridLayout
            layouts={layouts}
            rowHeight={this.state.rowHeight}
            onBreakpointChange={this.onBreakPointChange}>
            <div className="PostIt" key="a">a</div>
            <div className="PostIt" key="b">b</div>
            <div className="PostIt" key="c">c</div>
          </ResponsiveGridLayout>
        </div>
        )
      }
}