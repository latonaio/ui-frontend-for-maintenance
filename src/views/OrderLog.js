import React from 'react'
import {Grid, Table} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import Header from "../containers/AionHeader";
import Footer from "../components/Footer";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";


class OrderLog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
    };

    this.props.getOrderLog();

    this.orderLogTableBodyRows = this.orderLogTableBodyRows.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  orderLogTableBodyRows() {
    const tableRows = [];
    for (let i = 0; i < this.props.order_log.data.length; i++) {
      tableRows.push(
        <Table.Row>
          <Table.Cell width={2}>{this.props.order_log.data[i].timestamp}</Table.Cell>
          <Table.Cell width={2}>{this.props.order_log.data[i].process_name}</Table.Cell>
          <Table.Cell width={3}>{this.props.order_log.data[i].robot_name}</Table.Cell>
          <Table.Cell width={7}>{this.props.order_log.data[i].order_content}</Table.Cell>
          <Table.Cell width={2}>{this.props.order_log.data[i].order_user_name}</Table.Cell>
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

        <Header title="データ変化時のバックアップ"/>

        <Grid className="Grid" style={{height: this.state.gridHeight + "px"}}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Navbar/>
            </Grid.Column>
            <Grid.Column width={12} style={{marginTop: "10px"}}>
              <RobotHeader pageName={"データ変化時のバックアップ"} robotID={1} type={"controller"}/>
              <Table celled className={'scrollable-table'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>変更日時</Table.HeaderCell>
                    <Table.HeaderCell width={2}>工程</Table.HeaderCell>
                    <Table.HeaderCell width={3}>機器</Table.HeaderCell>
                    <Table.HeaderCell width={7}>変更内容</Table.HeaderCell>
                    <Table.HeaderCell width={2}>担当者</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body style={{maxHeight: this.state.tableBodyHeight + "px"}}>
                  <this.orderLogTableBodyRows/>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer/>
      </div>
    )
  }
}


export default OrderLog;
