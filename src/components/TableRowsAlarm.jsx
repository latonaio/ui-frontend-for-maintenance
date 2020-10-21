import React from 'react'
import TableRowRobotComponent from './TableRowAlarm';

export default class TableRowsAlarmComponent extends React.Component {
  render() {
    const rows = [];
    if (this.props.rows !== undefined) {
      for (let i in this.props.rows) {
        if (this.props.rows.hasOwnProperty(i)) {
          rows.push(
            <TableRowRobotComponent
	      AlarmCode={this.props.rows[i].AlarmCode}
              AlarmTime={this.props.rows[i].AlarmTime}
              AlarmName={this.props.rows[i].AlarmName}
            />
          )
        }
      }
    }

    return (
      rows
    )
  }
}

