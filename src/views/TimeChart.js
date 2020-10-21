import React from 'react'
import {Button, Form, FormField, Input, Modal, Tab} from 'semantic-ui-react'
import AionHeader from '../containers/AionHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepChartGraphs from "../components/StepChartGraphs";
import RobotHeader from "../containers/RobotHeader";

const GET_ROBOT_POSITION_COMMAND = "0x0075";
const GET_ROBOT_TORQUE_COMMAND = "0x0077";


const TIME_CHART_PROPERTIES = {
  [GET_ROBOT_POSITION_COMMAND]: {
    "name": "ロボット位置",
    "series": {
      "Axes01": {color: "black"},
      "Axes02": {color: "black"},
      "Axes03": {color: "black"},
      "Axes04": {color: "black"},
      "Axes05": {color: "black"},
      "Axes06": {color: "black"},
    }
  },
  [GET_ROBOT_TORQUE_COMMAND]: {
    "name": "トルク",
    "series": {
      "Axes01": {color: "black"},
      "Axes02": {color: "black"},
      "Axes03": {color: "black"},
      "Axes04": {color: "black"},
      "Axes05": {color: "black"},
      "Axes06": {color: "black"},
    }
  },
};

class TimeChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      selected: {
        command: null,
        key: null,
      },
      threshold: null,
    };

    this.props.getAxesName();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.thresholdModal = this.thresholdModal.bind(this);
    this.timeChartPane = this.timeChartPane.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  openThresholdModal = (command, key) => this.setState({open: true, selected: {command, key}});
  handleClose = () => this.setState({open: false, threshold: null, selectedKey: 0});
  handleChange = (e, input) => this.setState({threshold: input.value});
  handleSubmit = () => {
    this.props.setThreshold(this.state.threshold, this.state.selected.command, this.state.selected.key);
    this.handleClose();
  };

  thresholdModal() {
    if (this.state.selected.command === null || this.state.selected.key === null) {
      return "";
    } else {
      return (
        <Modal size={"small"} open={this.state.open} onClose={this.handleClose}>
          <Modal.Header>閾値設定:&nbsp;
            {TIME_CHART_PROPERTIES[this.state.selected.command]["name"]}&nbsp;
            {TIME_CHART_PROPERTIES[this.state.selected.command]["series"][this.state.selected.key]["name"]}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <FormField
                control={Input}
                label={`閾値(現在の閾値: 
                ${this.props.time_chart.thresholds[this.state.selected.command][this.state.selected.key]})`}
                placeholder='閾値'
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              content='Cancel'
              onClick={this.handleClose}
            />
            <Button
              positive
              icon='checkmark'
              labelPosition='left'
              content='OK'
              disabled={this.state.threshold === undefined || this.state.threshold === null}
              onClick={this.handleSubmit}
            />
          </Modal.Actions>
        </Modal>
      );
    }
  }

  timeChartPane(command) {
    return {
      menuItem: TIME_CHART_PROPERTIES[command]["name"], render: () => <Tab.Pane>
        <h1>
          {TIME_CHART_PROPERTIES[command]["name"]}
        </h1>
        <StepChartGraphs
          data={this.props.time_chart.data[command]}
          thresholds={this.props.time_chart.thresholds[command]}
          series={TIME_CHART_PROPERTIES[command]["series"]}
          openThresholdModal={this.openThresholdModal.bind(this, command)}
          axesName={this.props.axes.data}
        />
      </Tab.Pane>
    }
  }


  render() {
    return (
      <div class="ui fluid container">
        <AionHeader title="タイムチャートデータ収集"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"タイムチャートデータ収集"} robotID={1} type={"chart"} command={'0x0075'}/>
          <Tab panes={[
            this.timeChartPane(GET_ROBOT_POSITION_COMMAND),
            this.timeChartPane(GET_ROBOT_TORQUE_COMMAND),
          ]}/>
        </div>

        <this.thresholdModal/>
        <Footer/>
      </div>
    )
  }
}


export default TimeChart;
