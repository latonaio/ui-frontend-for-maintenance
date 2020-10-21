import React from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {Button, Grid} from 'semantic-ui-react'

class StepChartGraph extends React.Component {
  render() {
    return (
      <Grid.Row centered>
        <Grid.Column width={1} className={"step-chart-label"} textAlign={"center"} verticalAlign={"middle"}>
          <div style={{color: this.props.series.color}}>
            <div style={{color: this.props.series.color}}>
              {this.props.axesName}
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={2} className={"step-chart-label"} textAlign={"center"} verticalAlign={"middle"}>
          <div>
            {this.props.threshold}
          </div>
          <div>
            <Button onClick={this.props.openThresholdModal.bind(this, this.props.dataKey)}
                    compact size={"mini"} content={"閾値変更"}/>
          </div>
        </Grid.Column>
        <Grid.Column width={13}>
          <LineChart width={this.props.width} height={this.props.height} data={this.props.data}
                     isAnimationActive={false} animationDuration={0}>
            <XAxis dataKey="TimeStamp" hide={true}/>
            <YAxis type={"number"} domain={[-0.1, 1.1]} hide={true}/>
            <CartesianGrid stroke="#eee" horizontalPoints={[0, 1]}/>
            <Line isAnimationActive={false} type="stepAfter" name={this.props.series.name}
                  dataKey={this.props.dataKey} stroke="#000000" dot={false}/>
          </LineChart>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default StepChartGraph;