import React from "react";
import AionHeader from "../containers/AionHeader";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RobotHeader from "../containers/RobotHeader";

import {Grid, Header, Icon} from "semantic-ui-react";
import WindowSizeListener from "react-window-size-listener";

const DEVICE_STATUS_CONNECTING = 0;

class ConnectionStatus extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
    };

    this.props.fetchDevices();
  }

  componentDidMount = () => {
    this.timerID = setInterval(() => this.props.fetchDevices(), 3000);
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  }

  connectionStatusList = () =>
    <Grid divided='vertically'
          style={{
            margin: "auto 10px",
          }}
          textAlign={"left"}
          verticalAlign={"middle"}>
      <Grid.Row style={{
        padding: "0",
      }}>
        <Grid.Column width={4}><Header content={"Macアドレス"}/></Grid.Column>
        <Grid.Column width={4}><Header content={"IPアドレス"}/></Grid.Column>
        <Grid.Column width={4}><Header content={"機器名"}/></Grid.Column>
        <Grid.Column width={4}><Header content={"Connection Status"}/></Grid.Column>
      </Grid.Row>
      {this.props.device.data.map(connectionStatus => this.connectionStatusListItem(connectionStatus))}
    </Grid>

  connectionStatusListItem = (connectionStatus) =>
    <Grid.Row
      style={{
        border: "1px solid",
        borderRadius: "5px",
        margin: "5px auto",
        padding: "0",
      }}>
      <Grid.Column width={4}><Header content={connectionStatus.macAddress}/></Grid.Column>
      <Grid.Column width={4}><Header content={connectionStatus.deviceIp}/></Grid.Column>
      <Grid.Column width={4}><Header content={connectionStatus.deviceName}/></Grid.Column>
      <Grid.Column width={2} textAlign={"left"}>
        <Header content={
          connectionStatus.connectionStatus === DEVICE_STATUS_CONNECTING ? "Connected" : "Disconnected"
        }/>
      </Grid.Column>
      <Grid.Column width={2} textAlign={"left"}>
        {
          connectionStatus.connectionStatus === DEVICE_STATUS_CONNECTING
            ? <Icon size={"large"} name={"check circle"} color={"green"}/>
            : <Icon size={"large"} name={"exclamation triangle"} color={"red"}/>
        }
      </Grid.Column>
    </Grid.Row>

  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener
          onResize={(windowSize) => {
            const gridHeight = windowSize.windowHeight - 130;
            this.setState({gridHeight: gridHeight});
          }}
        />

        <AionHeader title="接続機器"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"接続機器"}/>
          <this.connectionStatusList/>
        </div>

        <Footer/>
      </div>
    );
  }
}

export default ConnectionStatus;
