import React from 'react'
import {Grid, Table} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import Header from "../containers/AionHeader";
import Footer from "../components/Footer";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";

class ErrorValue extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
    };

    this.props.getErrorValue();

    this.tableBodyRows = this.tableBodyRows.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  tableBodyRows() {
    const tableRows = [];
    for (let i = 0; i < this.props.error_value.data.length; i++) {
      tableRows.push(
        <Table.Row>
          <Table.Cell textAlign={"left"}>
            {this.props.error_value.data[i].timestamp}
          </Table.Cell>
          <Table.Cell textAlign={"right"}>
            {this.props.error_value.data[i].robot_id}
          </Table.Cell>
          <Table.Cell textAlign={"left"}>
            {this.props.error_value.data[i].command_no}
          </Table.Cell>
          <Table.Cell textAlign={"left"}>
            {this.props.error_value.data[i].error_type}
          </Table.Cell>
          <Table.Cell textAlign={"right"}>
            {this.props.error_value.data[i].error_value}
          </Table.Cell>
          <Table.Cell textAlign={"center"}>
            {this.props.error_value.data[i].min_threshold}&nbsp;~&nbsp;{this.props.error_value.data[i].max_threshold}
          </Table.Cell>
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

        <Header title="差分表示"/>

        <Grid className="Grid" style={{height: this.state.gridHeight + "px"}}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Navbar/>
            </Grid.Column>
            <Grid.Column width={12} style={{marginTop: "10px"}}>
              <RobotHeader pageName={"差分表示"} robotID={1} type={"controller"}/>
              <Table celled className={'scrollable-table'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign={"center"}>検出時刻</Table.HeaderCell>
                    <Table.HeaderCell textAlign={"center"}>ロボットID</Table.HeaderCell>
                    <Table.HeaderCell textAlign={"center"}>コマンド番号</Table.HeaderCell>
                    <Table.HeaderCell textAlign={"center"}>異常種別</Table.HeaderCell>
                    <Table.HeaderCell textAlign={"center"}>実測値</Table.HeaderCell>
                    <Table.HeaderCell textAlign={"center"}>閾値</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body style={{maxHeight: this.state.tableBodyHeight + "px"}}>
                  <this.tableBodyRows/>
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


export default ErrorValue;
