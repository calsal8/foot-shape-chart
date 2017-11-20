import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

export default class SimpleChart extends Component {
  renderShapesBars() {
    return this.props.data.allShapes.map((shapeName, key) => <Bar key={key} dataKey={shapeName} fill={'#'+(Math.random()*0xFFFFFF<<0).toString(16)} stackId="stack" />)
  }

  render () {
    return (
      <BarChart width={window.innerWidth-40} height={600} data={this.props.data.sizeList} stackOffset="sign"
                margin={{top: 5, right: 20, left: 20, bottom: 5}}>
        <XAxis dataKey="size"/>
        <YAxis dataKey="total"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <ReferenceLine y={0} stroke='#555'/>
        {this.renderShapesBars()}
      </BarChart>
    );
  }
}