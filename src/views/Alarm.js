import React from 'react';
import {Tab, Table} from 'semantic-ui-react';
import Header from '../containers/AionHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener';

import TableRows from "../components/TableRowsAlarm";
import RobotHeader from "../containers/RobotHeader";

const ALARM_TABLE_PROPERTIES = [
  "重故障",
  "軽故障",
  "ユーザアラーム（システム）",
  "ユーザアラーム（ユーザ）",
  "オフラインアラーム",
];

class Alarm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.alarmTab = this.alarmTab.bind(this);
    this.alarmPane = this.alarmPane.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  alarmTab() {
    const panes = [];
    for (let index = 0; index < ALARM_TABLE_PROPERTIES.length; index++) {
      panes.push(this.alarmPane(index))
    }

    return <Tab panes={panes}/>
  }

  alarmPane(index) {

    return {
      menuItem: ALARM_TABLE_PROPERTIES[index], render: () =>
        <Tab.Pane>
          <Table celled className={'scrollable-table'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>コード</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>異常名</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>発生日時</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{maxHeight: this.state.tableBodyHeight + "px"}}>
              <TableRows rows={this.props.alarm.data[index]}/>
            </Table.Body>
          </Table>
        </Tab.Pane>
    }
  }

  render() {
    return (
      <div className={"ui fluid container"}>
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          const tableBodyHeight = windowSize.windowHeight - 420;
          this.setState({
            gridHeight: gridHeight,
            tableBodyHeight: tableBodyHeight,
          });
        }}/>

        <Header title="異常履歴"/>
        <Navbar/>
        <div className="main-contents">
          <RobotHeader pageName={"異常履歴"} robotID={1} type={"controller"} command={'0x0071'}/>
          <this.alarmTab/>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default Alarm;
