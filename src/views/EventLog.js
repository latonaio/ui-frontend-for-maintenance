import React from 'react'
import {Table} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import Header from "../containers/AionHeader";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";

class EventLog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
    };

    this.props.getEvent();

    this.eventTableBodyRows = this.eventTableBodyRows.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getEvent(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  eventTableBodyRows() {
    const tableRows = [];
    for (let i = 0; i < this.props.event_log.data.length; i++) {
      tableRows.push(
        <Table.Row>
          <Table.Cell>{this.props.event_log.data[i].Event}</Table.Cell>
          <Table.Cell>{this.props.event_log.data[i].Date}</Table.Cell>
        </Table.Row>
      );
    }

    return tableRows;
  }

  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          const tableBodyHeight = windowSize.windowHeight - 420;
          this.setState({
            gridHeight: gridHeight,
            tableBodyHeight: tableBodyHeight,
          });
        }}/>

        <Header title="イベントログ"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"イベントログ"} robotID={1} type={"controller"} command={'0x0072'}/>
          <Table celled className={'scrollable-table'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>イベント</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>日時</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body style={{maxHeight: this.state.tableBodyHeight + "px"}}>
              <this.eventTableBodyRows/>
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}


export default EventLog;
