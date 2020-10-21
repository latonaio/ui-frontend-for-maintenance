import React from 'react';
import {Table} from 'semantic-ui-react';
import AionHeader from '../containers/AionHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener';

import TableRowsJtektAlarm from "../components/TableRowsJtektAlarm";
import RobotHeader from "../containers/RobotHeader";

class JtektAlarm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className={"ui fluid container"}>
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          const tableBodyHeight = windowSize.windowHeight - 370;
          this.setState({
            gridHeight: gridHeight,
            tableBodyHeight: tableBodyHeight,
          });
        }}/>

        <AionHeader title="異常履歴"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"異常履歴"}/>
          <Table celled className={'scrollable-table'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>アドレス</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>異常名称</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>発生日時</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>解除日時</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{maxHeight: this.state.tableBodyHeight + "px"}}>
              <TableRowsJtektAlarm rows={this.props.jtekt_alarm.data}/>
            </Table.Body>
          </Table>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default JtektAlarm;
