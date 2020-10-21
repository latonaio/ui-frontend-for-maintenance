import React from 'react'
import {Tab} from 'semantic-ui-react'
import AionHeader from '../containers/AionHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener'
import LineChartGraph from "../components/LineChartGraph";
import RobotHeader from "../containers/RobotHeader";

const GET_ROBOT_POSITION_COMMAND = "0x0075";
const GET_ROBOT_TORQUE_COMMAND = "0x0077";

const WAVE_CHART_PROPERTIES = {
  [GET_ROBOT_POSITION_COMMAND]: {
    "name": "ロボット位置",
    "series": [
      {
        "Axes01": {color: "#005E9D"},
        "Axes02": {color: "#82D800"},
        "Axes03": {color: "#F7CB00"},
      },
      {
        "Axes04": {color: "#005E9D"},
        "Axes05": {color: "#82D800"},
        "Axes06": {color: "#F7CB00"},
      }
    ],
    "domain": [
      [0, 1500],
      [-360, 360],
    ],
    "ticks": [
      [0, 250, 500, 750, 1000, 1250, 1500],
      [-360, -180, 0, 180, 360],
    ]
  },
  [GET_ROBOT_TORQUE_COMMAND]: {
    "name": "トルク",
    "series": [
      {
        "Axes01": {color: "#005E9D"},
        "Axes02": {color: "#82D800"},
        "Axes03": {color: "#F7CB00"},
      },
      {
        "Axes04": {color: "#005E9D"},
        "Axes05": {color: "#82D800"},
        "Axes06": {color: "#F7CB00"},
      }
    ],
    "domain": [
      [0, 1],
      [0, 1],
    ],
    "ticks": [
      [0, 0.25, 0.5, 0.75, 1.0],
      [0, 0.25, 0.5, 0.75, 1.0],
    ]
  },
};

class WaveChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {gridHeight: 800};
    this.props.getAxesName();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.waveChartPane = this.waveChartPane.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  waveChartPane(command) {
    return {
      menuItem: WAVE_CHART_PROPERTIES[command]["name"], render: () =>
        <Tab.Pane>
          <h1>
            {WAVE_CHART_PROPERTIES[command]["name"]}
          </h1>
          <LineChartGraph
            data={this.props.wave_chart.data[command]}
            series={WAVE_CHART_PROPERTIES[command]["series"][0]}
            domain={WAVE_CHART_PROPERTIES[command]["domain"][0]}
            ticks={WAVE_CHART_PROPERTIES[command]["ticks"][0]}
            axesName={this.props.axes.data}
          />
          <LineChartGraph
            data={this.props.wave_chart.data[command]}
            series={WAVE_CHART_PROPERTIES[command]["series"][1]}
            domain={WAVE_CHART_PROPERTIES[command]["domain"][1]}
            ticks={WAVE_CHART_PROPERTIES[command]["ticks"][1]}
            axesName={this.props.axes.data}
          />
        </Tab.Pane>
    }
  }

  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          this.setState({gridHeight: gridHeight});
        }}/>

        <AionHeader title="WaveChart"/>
        <Navbar/>

        <div className="main-contents" style={{height: this.state.gridHeight + "px"}}>
          <RobotHeader pageName={"波形データ収集"} robotID={1} type={"chart"} command={'0x0075'}/>
          <Tab panes={[
            this.waveChartPane(GET_ROBOT_POSITION_COMMAND),
            this.waveChartPane(GET_ROBOT_TORQUE_COMMAND),
          ]}/>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default WaveChart;