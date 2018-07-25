import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import {connect} from "react-redux";
import PostIt from "./PostIt";
import {moveTask, resizeTask} from "../actions";
import {getMost, getMax} from "../taskUtils";
const ResponsiveGridLayout = WidthProvider(Responsive);

class Matrix extends React.Component{
    constructor(props){
      super(props)
      this.default = {
        breakpoints: {lg: 1800*0.70, md: 1200*0.7, sm: 900*0.9, xs: 600*0.95},
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs:2}
      }

      this.firstItem = {
        task : null,
        ref : React.createRef()
      }
      this.state = {
        currentBreakpoint : "lg",
        rowHeight : 130
      }
      this.setItemWidth = this.setItemWidth.bind(this);
      this.onLayoutChange = this.onLayoutChange.bind(this);
      this.onDragStop = this.onDragStop.bind(this);
      this.onResizeStop = this.onResizeStop.bind(this);
    }

    setRowHeight = () => {
      var node = ReactDOM.findDOMNode(this);
      if (node instanceof HTMLElement){
        var rowHeight = node.offsetWidth / this.default.cols[this.state.currentBreakpoint];
        this.setState({rowHeight});
      } 
    }

    setItemWidth() {
      if (this.firstItem.ref.current instanceof HTMLElement){
        const paddingOffset = this.firstItem.task.width === 2 ? 5 : 0
        const itemWidth = this.firstItem.ref.current.offsetWidth/this.firstItem.task.width - paddingOffset;
        this.setState({itemWidth});
      } 
    }
    componentDidMount(){
      window.addEventListener("resize", this.setItemWidth);
      window.addEventListener("load", this.setItemWidth)
      this.setItemWidth();
    }

    componentWillUnmount(){
      window.removeEventListener("resize", this.setItemWidth);
      window.removeEventListener("load", this.setItemWidth);
    }

    onBreakPointChange = (breakpoint) => {
      this.setState({currentBreakpoint:breakpoint})
    }

    generateLayouts(){
      var layouts = {lg : []};

      layouts.lg = this.props.tasks.map(function(task, i){
        return {
          i : String(task.id),
          x : task.importance,
          y : task.urgence,
          w : task.width,
          h : task.height
        }
      });

      return layouts;
    }

    generatePostIts(){
      return this.props.tasks.map(function(task, i){
        /*This is for having the ref of the first task displayed
         (in order to calculate width of grid element) */
        var ref=null;
        if(i===0){
          ref = this.firstItem.ref;
          this.firstItem.task = task;
        }
        return (
          <div key={task.id} ref={ref}>
            <PostIt task={task}/>
      </div>
    );
      }.bind(this));
    }
    onResize(layout, oldItem, newItem, placeholder){
      var w = newItem.w;
      var h = newItem.h;
      if(w > 2)
        w = 2;
      if(h > 2)
        h = 2;
      if((w === 2 && h === 1) 
      || (w === 1 && h === 2) 
      || (w === 1 && h === 1)){
        w=1;
        h=1;
    }
      else if(w === 2 && h === 2){
        w=2;
        h=2;
      }

      newItem.w=w;
      placeholder.w=w;
      newItem.h=h;
      placeholder.h=h;
    }
    onResizeStop(layout, oldItem, newItem){
      this.props.resizeTask(newItem.i, newItem.w, newItem.h);
      console.log(this.props.tasks);
    }

    onDragStop(layout, oldItem, newItem){
      this.props.moveTask(newItem.i, newItem.y, newItem.x);
    }
    render() {
        return (
        <div id="Matrix">
          <div id="ImportanceArrow"/>
          <div id="UrgenceArrow"/>
          <div id="ImportanceAxis"/>  
          <div id="UrgenceAxis"/>
          <div id="UrgenceLabel">Urgence</div>
          <div id="ImportanceLabel">Importance</div>        
          <ResponsiveGridLayout
            layouts={this.generateLayouts()}
            cols={this.default.cols}
            breakpoints={this.default.breakpoints}
          rowHeight={this.state.itemWidth}
            onBreakpointChange={this.onBreakPointChange}
            compactType={null}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          onDragStop={this.onDragStop}>
            {this.generatePostIts()}
          </ResponsiveGridLayout>
        </div>
        )
      }
}

function mapStateToProps(state){
  return {
    tasks : state.tasks
  }
}

export default connect(mapStateToProps, null)(Matrix);