import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";

import PostIt from "./PostIt";
import actions from "../actions";
import { getOrigins } from "../middleware/layout/getters";
import { breakpoints, cols } from "../constants";
import update from "immutability-helper";

/* Main component of the application : 
  it is a responsive grid that displays a set of colored post it notes that represent 
  tasks. The user adds these tasks and puts them in a position that defines its "urgence" and "importance"/
  The challenge here was to work with a responsive grid and divide it into four distinct sections that should
  never spacially interfere. One other main challenge was to prevent collisions and weird unexpected behaviour all
  while keeping in mind the responsiveness of the web app. 
  The features includ : 
    - Adding a task in the category chosen by the user in the least urgent and least important position for that 
      category by default
    - Moving said task wherever the user sees fit
    - The moving should automatically change the category of the task should the user 
      go beyond the category's boundaries
    - The "boundaries" are just virtual, the component acts as a whole and depending on the state we
      display the boundaries
    - Editting tasks to add a description and change the name of the task
    - Resize the task : possible sizes are 2x2, 2x1 and 1x2 for presentation's sake 
    - Delete the task : it is removed from the database
    - Mark the task as done : it is no longer displayed but kept in memory (Done tasks will be available in the My Account tab) */

class Matrix extends React.PureComponent {
  constructor(props) {
    super(props);

    /* It is quite difficult to make a responsive square with the react-grid-layout as it only changes the width and not the
      height. Hence: I keep a reference to the first task displayed in order to get its width and update the row height of the grid
      in order to keep it square. */

    this.firstItem = {
      task: null,
      ref: React.createRef()
    }

    /* The state is mainly used to force certain aspects of the display:
      - itemWidth should always match the 1x1 square width of the grid
      - dummy is a boolean for displaying a dummy task to force update 
        (react-grid-layout doesn't update when the layout doesn't have more or less tasks) 
      - edit is an object to keep track of which tasks are currently being editted*/

    this.state = { itemWidth: 150, dummy: false, edit: {} }

    //Binding callback methods 

    this.onWidthChange = this.onWidthChange.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  // We listen to window resize to update the itemWidth state
  // We purposefully trigger the callback to get the initial itemWidth

  componentDidMount() {
    window.addEventListener("resize", this.onWidthChange);
    window.addEventListener("load", this.onWidthChange);
    this.onWidthChange();
  }

  componentDidUpdate() {
    this.onWidthChange();
  }

  // We remove the listeners at dismount

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWidthChange);
    window.removeEventListener("load", this.onWidthChange);
  }

  // Utility function to get the current breakpoint

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

  /* Utility function to generate the react-grid-layout layout from state. 
      It is important to note that urgence and importance are local coordiantes 
      whose origins are a the least important and least urgent of each category*/

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

  // Utility function to generate the post it components 
  generatePostIts() {
    const divs = this.props.tasks.map(function (task, i) {
      var ref = null;
      if (i === 0) {
        /*This is for having the ref of the first task displayed
          (in order to calculate width of grid element) */
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

  //Adds and removes dummy task instantly

  addRemoveDummy() {
    this.setState({ dummy: true });
    setTimeout(() => this.setState({ dummy: false }), 0);
  }

  // Dispatches DELETE_TASK action

  onClose(_id) {
    this.props.deleteTask(_id);
  }

 // Dispatches TASK_DONE action

  onDone(_id) {
    var task = this.props.tasks.find(task => task._id === _id);
    this.props.taskDone(task);
  }

  // Handling task edition

  onEdit(_id) {
    var edit = update(this.state.edit, { [_id]: { $set: true } });
    this.setState({ edit });
  }

   // Dispatches SUBMIT_EDIT action

  onSubmitEdit(_id, name, description) {
    this.props.submitEdit(_id, name, description)
    var edit = update(this.state.edit, { [_id]: { $set: false } });
    this.setState({ edit });
  }

   // Dispatches CHANGE_CURRENT_BREAKPOINT action

  onBreakPointChange = (breakpoint) => {
    this.props.changeCurrentBreakpoint(breakpoint);
  }

  // Handling resize by constraining the size to 2x2, 2x1 or 1x2

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

  // Dispatches RESIZE_TASK action

  onResizeStop(layout, oldItem, newItem) {
    this.props.resizeTask(newItem.i, newItem.w, newItem.h);
  }

  // Dispatches MOVE_TASK action

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

    /* Takes the first task's width from DOM : depending on the width of the task 
      in the grid we substract the padding that react-grid-layout adds between grid items  */

    if (this.firstItem.ref.current instanceof HTMLElement) {
      const paddingOffset = this.firstItem.task.width === 2 ? 5 : 0
      const itemWidth = this.firstItem.ref.current.offsetWidth / this.firstItem.task.width - paddingOffset;
      // Prevents infinite update loop
      if (this.state.itemWidth !== itemWidth)
        this.setState({ itemWidth });
    }
  }

  // Rendering

  render() {

    /* Visual delimitors setup :
        We take the current urgence and importance limit and multiply it by itemwidth and adding padding 
        into account to get the position of the delimitors */

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
        {/* If the matrix is empty don't display delimitors */}
        {this.props.tasks.length !== 0 ? urgDelim : null}
        {this.props.tasks.length !== 0 ? impDelim : null}

        {/* This is to display the urgence importance axis */}

        <div id="ImportanceArrow" />
        <div id="UrgenceArrow" />
        <div id="ImportanceAxis" />
        <div id="UrgenceAxis" />
        <div id="UrgenceLabel">Urgence</div>
        <div id="ImportanceLabel">Importance</div>

        {/* Configuration of the responsive grid */}

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

// Redux binding functions to have the state and the dispatch wrapped action creaters as a prop 

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

/* The withSize is a higher order component (from react-sizeme) that returns a component with a size prop that updates with window changes
    this is impotant since the react-grid-layout needs a width parameter */

export default withRouter(withSize()(connect(mapStateToProps, mapDispatchToProps)(Matrix)));