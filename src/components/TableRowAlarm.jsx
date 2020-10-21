import React from 'react'
import {Table} from 'semantic-ui-react'

export default class TableRowRobotComponent extends React.Component {
  render() {
      if (this.props.AlarmCode === 0) {
          return (
            <Table.Row>
              <Table.Cell textAlign={'left'}/>
              <Table.Cell textAlign={'left'}/>
              <Table.Cell textAlign={'left'}/>
            </Table.Row>
          )
      }
    return (
      <Table.Row>
        <Table.Cell textAlign={'left'}>{this.props.AlarmCode}</Table.Cell>
        <Table.Cell textAlign={'left'}>{this.props.AlarmName}</Table.Cell>
        <Table.Cell textAlign={'left'}>{this.props.AlarmTime}</Table.Cell>
      </Table.Row>
    )
  }
}
