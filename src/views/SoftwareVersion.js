import React from 'react'
import {Grid} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import Header from "../containers/AionHeader";
import Footer from "../components/Footer";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";

class SoftwareVersion extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.props.getSoftVersion();
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getSoftVersion(), 1000);
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

        <Header title="ソフトウェアバージョン"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"ソフトウェアバージョン"} robotID={1} type={"controller"} command={'0x0089'}/>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>パラメータ</Grid.Column>
              <Grid.Column width={1}>:</Grid.Column>
              <Grid.Column width={4}>{this.props.software_version.data.ParameterVersion}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>モデル</Grid.Column>
              <Grid.Column width={1}>:</Grid.Column>
              <Grid.Column width={4}>{this.props.software_version.data.MachineName}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>用途</Grid.Column>
              <Grid.Column width={1}>:</Grid.Column>
              <Grid.Column width={4}>{this.props.software_version.data.PurposeName}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>システムソフトウェアバージョン</Grid.Column>
              <Grid.Column width={1}>:</Grid.Column>
              <Grid.Column width={4}>{this.props.software_version.data.SystemSoftwareVersion}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>CPU</Grid.Column>
              <Grid.Column width={5}>システム ROM(CPU1/CPU2)</Grid.Column>
              <Grid.Column width={4}>ブート ROM</Grid.Column>
              <Grid.Column width={4}>OS/FPGA</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>ACP01</Grid.Column>
              <Grid.Column width={5}>2.02.11</Grid.Column>
              <Grid.Column width={4}/>
              <Grid.Column width={4}>1.04-10</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>AIF01</Grid.Column>
              <Grid.Column width={5}>--------</Grid.Column>
              <Grid.Column width={4}/>
              <Grid.Column width={4}>16092200</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>PP</Grid.Column>
              <Grid.Column width={5}>1.52-97</Grid.Column>
              <Grid.Column width={4}>1.71-00</Grid.Column>
              <Grid.Column width={4}>1.03</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>ASF01#0</Grid.Column>
              <Grid.Column width={5}>2.13-00 / 2.13-00</Grid.Column>
              <Grid.Column width={4}>1.00</Grid.Column>
              <Grid.Column width={4}>16122200</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>SDCA01#0</Grid.Column>
              <Grid.Column width={5}>2.02-02 / 2.02-02</Grid.Column>
              <Grid.Column width={4}>1.00</Grid.Column>
              <Grid.Column width={4}>16070401</Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default SoftwareVersion;
