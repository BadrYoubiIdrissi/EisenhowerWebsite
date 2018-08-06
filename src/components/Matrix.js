import React from "react";
import { Responsive } from "react-grid-layout";
import { withSize } from "react-sizeme";
import { connect } from "react-redux";
import PostIt from "./PostIt";
import actions from "../actions";
import { getOrigins } from "../middleware/layout/getters";
import { breakpoints, cols } from "../constants";
import update from "immutability-helper";
import { withRouter } from "react-router";
const ResponsiveGridLayout = Responsive;

class Matrix extends React.PureComponent {
  constructor(props) {
    super(props);

    this.firstItem = {
      task: null,
      ref: React.createRef()
    }

    this.state = { itemWidth: 150, dummy: false, edit: {} }

    this.onWidthChange = this.onWidthChange.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWidthChange);
    window.addEventListener("load", this.onWidthChange);
    this.onWidthChange();
  }


  componentDidUpdate() {
    this.onWidthChange();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWidthChange);
    window.removeEventListener("load", this.onWidthChange);
  }

  currentBreakpoint() {
    var curr = "xs";
    var bps = ["xs", "sm", "md", "lg"];
    for(var bp of bps){
      if(this.props.size.width >= breakpoints[bp]){
        curr = bp;
      }
    }
    return curr;
  }

  generateLayouts() {
    var layouts = {};
    const origins = getOrigins(this.props.limit);
    layouts[this.props.breakpoint] = this.props.tasks.map(function (task, i) {
      return {
        i: String(task._id),
        x: origins[task.category].importance + task.importance,
        y: origins[task.category].urgence + task.urgence,
        w: task.width,
        h: task.height,
        static: this.state.edit[task._id]
      }
    }.bind(this));
    if (this.state.dummy)
      layouts[this.props.breakpoint].push({ i: "DUMMY", x: Infinity, y: Infinity, w: 1, h: 1, static: true });
    return layouts;
  }

  generatePostIts() {
    const divs = this.props.tasks.map(function (task, i) {
      /*This is for having the ref of the first task displayed
      (in order to calculate width of grid element) */
      var ref = null;
      if (i === 0) {
        ref = this.firstItem.ref;
        this.firstItem.task = task;
      }
      return (
        <div key={task._id} ref={ref}>
          <PostIt task={task}
            onEdit={this.onEdit}
            onClose={this.onClose}
            onDone={this.onDone}
            onSubmitEdit={this.onSubmitEdit}
            edit={this.state.edit[task._id]} />
        </div>
      );
    }.bind(this));

    if (this.state.dummy)
      divs.push(<div key="DUMMY" id="DUMMY" />);
    return divs;
  }

  addRemoveDummy() {
    this.setState({ dummy: true });
    setTimeout(() => this.setState({ dummy: false }), 0);
  }

  onClose(_id) {
    this.props.deleteTask(_id);
  }
  onDone(_id) {
    var task = this.props.tasks.find(task => task._id === _id);
    this.props.taskDone(task);
  }

  onEdit(_id) {
    var edit = update(this.state.edit, { [_id]: { $set: true } });
    this.setState({ edit });
  }

  onSubmitEdit(_id, name, description) {
    this.props.submitEdit(_id, name, description)
    var edit = update(this.state.edit, { [_id]: { $set: false } });
    this.setState({ edit });
  }

  onBreakPointChange = (breakpoint) => {
    this.props.changeCurrentBreakpoint(breakpoint);
  }

  onResize(layout, oldItem, newItem, placeholder) {
    var w = newItem.w;
    var h = newItem.h;
    if (w > 2)
      w = 2;
    if (h > 2)
      h = 2;
    if (w === 1 && h === 1) {
      w = 2;
      h = 1;
    }
    else if (w === 2 && h === 2) {
      w = 2;
      h = 2;
    }

    newItem.w = w;
    placeholder.w = w;
    newItem.h = h;
    placeholder.h = h;
  }
  onResizeStop(layout, oldItem, newItem) {
    this.props.resizeTask(newItem.i, newItem.w, newItem.h);
  }


  onDragStop(layout, oldItem, newItem) {
    if(oldItem.x !== newItem.x || oldItem.y !== newItem.y)
    {
      this.props.moveTask(newItem.i, newItem.x, newItem.y);
      this.addRemoveDummy();
    }
    
  }

  onWidthChange() {
    var curr = this.currentBreakpoint();
    if (this.currentBreakpoint() !== this.props.breakpoint)
      this.onBreakPointChange(curr);
    if (this.firstItem.ref.current instanceof HTMLElement) {
      const paddingOffset = this.firstItem.task.width === 2 ? 5 : 0
      const itemWidth = this.firstItem.ref.current.offsetWidth / this.firstItem.task.width - paddingOffset;
      if (this.state.itemWidth !== itemWidth)
        this.setState({ itemWidth });
    }
  }

  render() {
    const horDelStyle = { top: `${this.props.limit.urgence * (this.state.itemWidth + 10) + 5}px` };
    const verDelStyle = { left: `${this.props.limit.importance * (this.state.itemWidth + 10) + 5}px` };
    const urgDelim = (<div
      className={"horDelim"}
      style={horDelStyle} />);
    const impDelim = (<div
      className={"verDelim"}
      style={verDelStyle} />);
    return (
      <div id="Matrix">
        {this.props.tasks.length !== 0 ? urgDelim : null}
        {this.props.tasks.length !== 0 ? impDelim : null}
        <div id="ImportanceArrow" />
        <div id="UrgenceArrow" />
        <div id="ImportanceAxis" />
        <div id="UrgenceAxis" />
        <div id="UrgenceLabel">Urgence</div>
        <div id="ImportanceLabel">Importance</div>
        <ResponsiveGridLayout
          layouts={this.generateLayouts()}
          cols={cols}
          breakpoints={breakpoints}
          rowHeight={this.state.itemWidth}
          onBreakpointChange={this.onBreakPointChange}
          compactType={null}
          width={this.props.size.width}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          onLayoutChange={this.onLayoutChange}
          onDragStop={this.onDragStop}
          preventCollision={true}>
          {this.generatePostIts()}
        </ResponsiveGridLayout>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.filter(task => !task.done),
    limit: state.limit,
    breakpoint: state.breakpoint
  }
}

const mapDispatchToProps = {
  moveTask: actions.moveTask,
  resizeTask: actions.resizeTask,
  changeCurrentBreakpoint: actions.changeCurrentBreakpoint,
  deleteTask: actions.deleteTask,
  taskDone: actions.taskDone,
  submitEdit: actions.submitEdit,
  fetchTasks: actions.fetchTasks,
  correctCollisions: actions.correctCollisions,
  adjustLimit: actions.adjustLimit
}

export default withRouter(withSize()(connect(mapStateToProps, mapDispatchToProps)(Matrix)));