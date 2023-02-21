import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import '../App.css';

class Connection extends Component {
  state = {
    connected: false,
    ros: null
  }

  constructor() {
    super();
    this.init_connection();
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();

    this.state.ros.on("connection", ()=>{
      console.log("Connection Established");
      this.setState({
        connected: true
      });
    });

    this.state.ros.on("close", ()=>{
      console.log("Connection Closed");
      this.setState({
        connected: false
      });
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

  render() {
    return (
        <div className="connection">
          <Alert className="text-center mx-3 connMsg" variant={this.state.connected ? "success":"danger"}>ROVER {this.state.connected ? "CONNECTED":"DISCONNECTED"}</Alert>
        </div>
    );
  }
}

export default Connection;
