import React from 'react'
import {Table} from 'semantic-ui-react'

export default class TableRowJtektComponent extends React.Component {
  render() {
    if (this.props.AlarmCode === "0") {
      return (
        <Table.Row>
          <Table.Cell textAlign={'left'}/>
          <Table.Cell textAlign={'left'}/>
          <Table.Cell textAlign={'left'}/>
          <Table.Cell textAlign={'left'}/>
        </Table.Row>
      )
    }
    return (
      <Table.Row>
        <Table.Cell textAlign={'left'}>{this.props.CircuitAddres}</Table.Cell>
        <Table.Cell textAlign={'left'}>{this.props.Comment01}</Table.Cell>
        <Table.Cell textAlign={'left'}>{this.props.ErrorOccurrenceTime}</Table.Cell>
        <Table.Cell textAlign={'left'}>{this.props.AlarmReleaseTime !== "NULL" ? this.props.AlarmReleaseTime : "発生中"}</Table.Cell>
      </Table.Row>
    )
  }
}
