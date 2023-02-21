import React, { Component } from "react";
import { GoBeaker } from "react-icons/go";
import '../App.css';
import { Line } from "react-chartjs-2";

class Methane extends Component {
    state = {
      value: 0,
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
        name: null,
        messageType: null
      });
  
      pos_subscriber.subscribe((msg) => {
        this.setState({

        });
      });
    }

    styles = {
      color: "#DC5F00",
      fontSize: "2rem",
      position: "relative",
      top: "0.6rem",
      left: "2.5rem"
    }
  
    render() {
      return ( 
        <div className="childContainer">
          <div className="heading">
            <h5>Methane Sensor</h5>
          </div>
          <div className="data">
            <div><GoBeaker style={this.styles}/></div>
            <div className="dataValue">
              <h6>Methane reading: </h6>
              <h4>{this.state.value} PPM</h4>
            </div>
          </div>
          <div className="graph">
          <Line
            data={this.state.value}
            options={{
              plugins: {
              title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
        />
        </div>
      </div>
      );
    }
  }
  

export default Methane;