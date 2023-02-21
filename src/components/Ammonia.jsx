import React, { Component } from "react";
import { GiChemicalDrop } from "react-icons/gi";
import '../App.css';
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-streaming';
import moment from "moment";

class Ammonia extends Component {
    state = {
      value: 0.3,
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

    dataGraph = {
      datasets: [
        {
          label: "Dataset 1 (linear interpolation)",
          backgroundColor: '#CF0A0A',
          borderColor: '#DC5F00',
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }
      ]
    };


  options = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: (chart) => {
              console.log(this);
              var x = moment()
              var y = Math.random();
              chart.data.datasets[0].data.push({
                x: x,
                y: y
              });
              this.setState({
                value: y
              });
            },
            delay: 3000,
            time: {
              displayFormat: "h:mm"
            }
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            callback: function(value) {
              return moment(value, "HH:mm:ss").format("mm:ss");
            }
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 1
          }
        }
      ]
    }
  };
  
    render() {
      return ( 
        <div className="childContainer">
          <div className="heading">
            <h5>Ammonia Sensor</h5>
          </div>
          <div className="data">
            <div><GiChemicalDrop style={this.styles}/></div>
            <div className="dataValue">
              <h6>Methane reading: </h6>
              <h4>{this.state.value.toFixed(2)} PPM</h4>
            </div>
          </div>
          <div className="graph">
            <Line data={this.dataGraph} options={this.options} />
          </div>
      </div>
      );
    }
  }
  

export default Ammonia;
