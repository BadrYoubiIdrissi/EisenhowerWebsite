import React from "react";
import ReactDOM from "react-dom";
import {Responsive, WidthProvider} from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

export default class Matrix extends React.Component{
    constructor(props){
      super(props)
      this.default = {
        breakpoints: {lg: 1800*0.70, md: 1200*0.7, sm: 900*0.9, xs: 600*0.95},
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs:2}
      }
      this.state = {
        currentBreakpoint : "lg",
        rowHeight : 130
      }
    }

    setRowHeight = () => {
      var node = ReactDOM.findDOMNode(this);
      if (node instanceof HTMLElement){
        var rowHeight = node.offsetWidth / this.default.cols[this.state.currentBreakpoint];
        this.setState({rowHeight});
      } 
    }

    componentDidMount(){
      window.addEventListener("resize", this.setRowHeight);
      window.addEventListener("load", this.setRowHeight)
      this.setRowHeight();
    }

    componentWillUnmount(){
      window.removeEventListener("resize", this.setRowHeight);
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
          {i: 'c', x: 2, y: 0, w: 1, h: 1}
          ]
        };
        return (
        <div id="Matrix">        
          <ResponsiveGridLayout
            layouts={layouts}
            cols={this.default.cols}
            breakpoints={this.default.breakpoints}
            rowHeight={this.state.rowHeight}
            onBreakpointChange={this.onBreakPointChange}
            verticalCompact={false}
            compactType='horizontal'>
            <div className="PostIt" key="a">a</div>
            <div className="PostIt" key="b">b</div>
            <div className="PostIt" key="c">c</div>
          </ResponsiveGridLayout>
        </div>
        )
      }
}