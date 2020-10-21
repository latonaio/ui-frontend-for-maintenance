import React from 'react'
import {Accordion, Grid, Label, List} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import AionHeader from "../containers/AionHeader";
import Footer from "../components/Footer";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";

const SUCCESS_STATE = 1;

class DataBackup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeIndex: null,
    };

    this.makerID = this.props.makerID;
    this.props.getBackupDataList(this.makerID);
  }

  backupDataAccordion = () =>
    <Accordion styled fluid>
      {this.processPanel()}
    </Accordion>;

  processPanel = () => {
    return this.props.data_backup.data.map(
      (dev, i) => [
        this.deviceTitle(dev.device, i),
        this.devicePanel(dev.backup, i),
      ]
    )
  }

  deviceTitle = (device, activeIndex) =>
    <Accordion.Title active={true} onClick={() => this.setState({activeIndex})}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            {`${device.deviceName}(${device.macAddress})`}
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Accordion.Title>


  devicePanel = (backups, index) =>
    <Accordion.Content active={this.state.activeIndex === index}>
      <List divided style={{overflow: 'auto', maxHeight: "50vh"}} content={
        this.backupList(backups)
      }/>
    </Accordion.Content>

  backupList = (backups) =>
    backups.map(bk =>
      <List.Item>
        <List.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <List.Icon name={"file"} size='large' verticalAlign='middle'/>{bk.date}
              </Grid.Column>
              <Grid.Column width={1} textAlign={"center"}>
                {this.statusLabel(bk.state)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Content>
      </List.Item>
    )

  statusLabel = (state) =>
    state === SUCCESS_STATE
      ? <Label content={"完了"} color={"blue"} style={{width: "100%"}}/>
      : <Label content={"エラー"} color={"red"} style={{width: "100%"}}/>;


  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          this.setState({gridHeight: gridHeight});
        }}/>

        <AionHeader title="データバックアップ"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"ロボット全データバックアップ"} robotID={1} type={"backup"}/>
          <this.backupDataAccordion/>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default DataBackup;
