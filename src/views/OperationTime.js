import React from 'react'
import {Grid} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import Header from "../containers/AionHeader";
import Footer from "../components/Footer";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";

const TIME_LIST = [
  {key: 1, label: "制御電源投入時間",},
  {key: 10, label: "サーボ電源投入時間",},
  {key: 110, label: "プレイバック時間",},
  {key: 210, label: "移動時間",},
  {key: 301, label: "作業時間",},
];

class OperationTime extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.timeRow = this.timeRow.bind(this);
  }

  timeRow() {
    const rows = [];

    for (let i = 0; i < TIME_LIST.length; i++) {
      rows.push(
        <Grid.Row>
          <Grid.Column width={4}>
            {TIME_LIST[i].label}
          </Grid.Column>
          <Grid.Column width={1} textAlign={"right"}>
            {this.props.operation_time.data[TIME_LIST[i].key].ElapsedTime}
          </Grid.Column>
          <Grid.Column width={3} textAlign={"right"}>
            {this.props.operation_time.data[TIME_LIST[i].key].StartTime ?
              `(${this.props.operation_time.data[TIME_LIST[i].key].StartTime}~)` : ""
            }
          </Grid.Column>
        </Grid.Row>
      );
    }

    return rows;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getOperationTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          this.setState({gridHeight: gridHeight});
        }}/>

        <Header title="稼働時間"/>
        <Navbar/>
        <div className="main-contents">
          <RobotHeader pageName={"稼働時間"} robotID={1} type={"controller"} command={'0x0088'}/>
          <Grid>
            <this.timeRow/>
          </Grid>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default OperationTime;
