import React, { Component } from "react";
import '../App.css';
import Connection from "./Connection";
import Luminosity from "./Luminosity";
import Moisture from "./Moisture";
import RobotPosition from "./RobotPosition";
import RobotVel from "./RobotVel";
import RobotAng from "./RobotAng";
import Temperature from "./Temp";
import Pressure from "./Pressure";
import Ph from "./Ph";
import Methane from "./Methane";
import Ammonia from "./Ammonia";

class Home extends Component {
  state = {};

  render() {
    return ( 
    <main>
      <h1 className="text-center my-5">Sensor Readings</h1>
        <Connection />
        <div className="container">
          <RobotVel />
          <RobotAng />
          <Pressure />
        </div>
        <div className="container">
          <Methane />
          <Ammonia />
          <Ph />
        </div>
        <div className="container">
          <Luminosity />
          <Moisture />
          <Temperature />
        </div>
    </main>
    );
  }
}

export default Home;
