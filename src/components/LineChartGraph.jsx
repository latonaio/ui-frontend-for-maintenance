import React from "react";
import {CartesianGrid, Legend, Line, LineChart, XAxis, YAxis} from "recharts";


class LineChartGraph extends React.Component {
  render() {
    const lines = [];
    for (let key in this.props.series) {
      if (this.props.series.hasOwnProperty(key)) {
        lines.push(
          <Line
            isAnimationActive={false}
            type="monotone"
            name={this.props.axesName[key]}
            dataKey={key}
            stroke={this.props.series[key]["color"]}
            strokeWidth={2}
          />
        );
      }
    }

    return (
      <LineChart width={900} height={250} data={this.props.data}
                 isAnimationActive={false} animationDuration={0}>
        <XAxis dataKey="TimeStamp"/>
        <YAxis type={"number"} domain={this.props.domain} ticks={this.props.ticks} allowDataOverflow/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        {lines}
        <Legend/>
      </LineChart>
    )
  }
}

export default LineChartGraph;