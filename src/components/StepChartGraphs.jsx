import React from "react";
import {Grid} from 'semantic-ui-react'
import StepChartGraph from './StepChartGraph'
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

const GRAPH_WIDTH = 900;
const GRAPH_HEIGHT = 55;

class StepChartGraphs extends React.Component {
  render() {
    const stepChartGraphs = [];
    for (let key in this.props.series) {
      if (this.props.series.hasOwnProperty(key)) {
        stepChartGraphs.push(
          <StepChartGraph
            data={this.props.data}
            threshold={this.props.thresholds[key]}
            dataKey={key}
            series={this.props.series[key]}
            axesName={this.props.axesName[key]}
            openThresholdModal={this.props.openThresholdModal}
            height={GRAPH_HEIGHT}
            width={GRAPH_WIDTH}
          />
        );
      }
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1} className={"step-chart-header"} textAlign={"center"} verticalAlign={"middle"}>
            <div>
              軸名
            </div>
          </Grid.Column>
          <Grid.Column width={2} className={"step-chart-header"} textAlign={"center"} verticalAlign={"middle"}>
            <div>
              閾値
            </div>
          </Grid.Column>
          <Grid.Column width={13}>
          </Grid.Column>
        </Grid.Row>
        {stepChartGraphs}
        <Grid.Row>
          <Grid.Column width={1} className={"step-chart-label"}>
          </Grid.Column>
          <Grid.Column width={2} className={"step-chart-label"}>
          </Grid.Column>
          <Grid.Column width={13}>
            <LineChart width={GRAPH_WIDTH} height={35} data={this.props.data}
                       isAnimationActive={false} animationDuration={0}>
              <XAxis dataKey="TimeStamp" hide={false}/>
              <YAxis type={"number"} domain={[0, 0]} hide={true}/>
              <CartesianGrid stroke="#eee" horizontalPoints={[0, 1]}/>
              <Line isAnimationActive={false} type="stepAfter" name={"系列" + this.props.index}
                    dataKey={this.props.series.key} stroke="#000000" dot={false}/>
            </LineChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default StepChartGraphs;