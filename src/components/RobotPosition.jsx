import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import '../App.css';

class RobotPosition extends Component {
  state = {
    x: 0,
    y: 0,
    orientation: 0,
    ros: null
  };

  constructor() {
    super();
    this.init_connection();
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();

    this.state.ros.on("connection", ()=>{

    });

    this.state.ros.on("close", ()=>{
      setTimeout(() => {
        try {
          this.state.ros.connect("ws://10.0.2.15:9090");
        } catch(err) {
          console.log(err);
        }
      }, 3000);
    });

    try {
      this.state.ros.connect("ws://10.0.2.15:9090");
    } catch(err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getRobotPos();
  }
  
  getRobotPos() {
    var pos_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/amcl_pose",
      messageType: "geometry_msgs/PoseWithCovarianceStamped"
    });

    pos_subscriber.subscribe((msg) => {
      this.setState({
        x: msg.pose.pose.position.x,
        y: msg.pose.pose.position.y
      });
    });
  }

  render() {
    return ( 
    <div className="position">
        <h5>Position: </h5>
        <br />
        <p>X: {this.state.x}</p>
        <p>Y: {this.state.y}</p>
        <p>Orientation: {this.state.orientation}</p>
    </div>
    );
  }
}

export default RobotPosition;
