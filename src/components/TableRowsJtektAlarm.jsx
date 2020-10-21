import React from 'react'
import TableRow from './TableRowJtektAlarm';

export default class TableRowsAlarmComponent extends React.Component {
  render() {
    const rows = [];
    if (this.props.rows !== undefined) {
      for (let i in this.props.rows) {
        if (this.props.rows.hasOwnProperty(i)) {
          rows.push(
            <TableRow
              CircuitAddres={this.props.rows[i].CircuitAddress}
              Comment01={this.props.rows[i].Comment01}
              AlarmReleaseTime={this.props.rows[i].AlarmReleaseTime}
              ErrorOccurrenceTime={this.props.rows[i].AlarmTime}
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

