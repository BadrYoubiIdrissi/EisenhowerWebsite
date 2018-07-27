import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import {connect} from "react-redux";
import PostIt from "./PostIt";
import {moveTask, resizeTask} from "../actions";
import {getMost, getMax} from "../taskUtils";
const ResponsiveGridLayout = WidthProvider(Responsive);

class Matrix extends React.Component{
    constructor(props){
      super(props);

      this.firstItem = {
        task : null,
        ref : React.createRef()
      }


      this.onWidthChange = this.onWidthChange.bind(this);
      this.onDragStop = this.onDragStop.bind(this);
      this.onResizeStop = this.onResizeStop.bind(this);
    }

    componentDidMount(){
      window.addEventListener("resize", this.onWidthChange);
      window.addEventListener("load", this.onWidthChange);
      this.onWidthChange();
      this.onBreakPointChange("lg");
    }
    componentWillUnmount(){
      window.removeEventListener("resize", this.onWidthChange);
      window.removeEventListener("load", this.onWidthChange);
    }

    generateLayouts(){
      var layouts = {};
      layouts[this.props.breakpoint] = this.props.tasks.map(function(task, i){
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
      const divs = this.props.tasks.map(function(task, i){
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
    onBreakPointChange = (breakpoint) => {
      this.props.changeCurrentBreakpoint(breakpoint);
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
      this.props.moveTask(newItem.i, newItem.x, newItem.y);
    }

    onWidthChange() {
      if (this.firstItem.ref.current instanceof HTMLElement){
        const paddingOffset = this.firstItem.task.width === 2 ? 5 : 0
        const itemWidth = this.firstItem.ref.current.offsetWidth/this.firstItem.task.width - paddingOffset;
        this.setState({itemWidth});
    }
    }

    render() {
      const horDelStyle = {top:`${this.props.limit.urgence*(this.state.itemWidth+10)+5}px`};
      const verDelStyle = {left:`${this.props.limit.importance*(this.state.itemWidth+10)+5}px`};
      const urgDelim = (<div 
        className={"horDelim"}
        style={horDelStyle}/>);
      const impDelim = (<div 
        className={"verDelim"}
        style={verDelStyle}/>);

      return (
      <div id="Matrix">
        {urgDelim}
        {impDelim}
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
          preventCollision={true}
          onLayoutChange={this.onLayoutChange}
          onDragStop={this.onDragStop}>
          {this.generatePostIts()}
        </ResponsiveGridLayout>
      </div>
      )
    }
}

function mapStateToProps(state){
  return {
    tasks : state.layout.tasks,
    limit : state.layout.limit,
    breakpoint : state.layout.breakpoint
  }
}

const mapDispatchToProps = {
  moveTask,
  resizeTask,
  changeCurrentBreakpoint,
}

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);