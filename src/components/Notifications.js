import React from "react";
import {connect} from "react-redux"; 
import NotificationSystem from "react-notification-system-redux";

class Notifications extends React.Component{
    render() {
        return <NotificationSystem 
            notifications = {this.props.notifications}
        />
    }
}

export default connect( state => ({notifications:state.notifications}))(Notifications)