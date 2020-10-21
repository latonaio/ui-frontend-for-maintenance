import React from 'react';
import {Header} from 'semantic-ui-react';

export default class PLCHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props.getRobotName(this.props.robotID);
  }

  render() {
    return (
      <div style={{marginBottom: "20px"}}>
        <Header content={this.props.pageName} as={"h1"}/>
        <Header
          content={`工程名: ${this.props.robot_header.data.processName} 収集PLC: ${this.props.robot_header.data.robotName}`}
          as={"h2"}/>
      </div>
    );
  }
}
