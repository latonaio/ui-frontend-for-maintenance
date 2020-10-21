import React from 'react';
import {Button, Dropdown, Grid, Header} from 'semantic-ui-react';

export default class RobotHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props.getRobotName(this.props.robotID);
    this.props.setCommand(this.props.command);
    this.props.unlockButton();
  }

  buttonArea = () => {
    if (this.props.type === "chart" || this.props.type === "controller") {
      return (
        <Grid.Column width={4} textAlign={"right"}>
          <Button content={"収集開始"} color={"blue"}
                  onClick={this.props.startReadTrigger.bind(this, this.props.runtime.command)}
                  disabled={this.props.runtime.isReading || this.props.runtime.isLocked}/>
          <Button content={"収集終了"} color={"blue"}
                  onClick={this.props.stopReadTrigger.bind(this, this.props.runtime.command)}
                  disabled={!this.props.runtime.isReading || this.props.runtime.isLocked}/>
        </Grid.Column>
      )
    }
    return "";
  }

  handleCommandChange = (e, {value}) => this.props.setCommand(value);

  processArea = () => {
    let columns = [];
    if (this.props.type === "chart" || this.props.type === "controller" || this.props.type === "backup") {
      columns.push(
        <Grid.Column width={6}>
          <Header content={"工程名: 塗装"}/>
        </Grid.Column>
      )
      if (this.props.type === "chart") {
        columns.push(
          <Grid.Column width={10}>
            <Header content={[
              "収集データ: ",
              <Dropdown
                selection
                key={`dropdown-command-${this.props.runtime.command}`}
                defaultValue={this.props.runtime.command}
                disabled={this.props.runtime.isReading}
                options={[
                  {key: '1', value: '0x0078', text: 'シグナル'},
                  {key: '2', value: '0x0075', text: 'ロボット位置'},
                  {key: '3', value: '0x0077', text: 'トルク'},
                ]}
                onChange={this.handleCommandChange}
              />
            ]}/>
          </Grid.Column>
        )
      }
    }
    return columns;
  }

  render() {
    return (
      <Grid style={{margin: "0 auto"}}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header content={this.props.pageName} as={"h1"}/>
          </Grid.Column>
          <this.buttonArea/>
        </Grid.Row>
        <Grid.Row verticalAlign={"middle"}>
          <this.processArea/>
        </Grid.Row>
        <hr style={{width: "100%"}}/>
      </Grid>
    );
  }
}
