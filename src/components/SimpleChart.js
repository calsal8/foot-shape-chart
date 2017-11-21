import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class SimpleChart extends Component {
  renderShapesBars() {
    return this.props.data.allShapes.map((shapeName, key) => <Bar key={key} dataKey={shapeName} fill={'#'+(Math.random()*0xFFFFFF<<0).toString(16)} stackId="stack" />)
  }

  render () {
    return (
      <div className='chart'>
        {this.props.data.gender.toLowerCase() === 'women' ? <i className="chart__gender swing fa fa-venus" title={this.props.data.gender} aria-hidden='true'></i> : <i className="chart__gender swing fa fa-mars" title={this.props.data.gender} aria-hidden='true'></i>}
        <div className='chart__system'>System: <span className='bold'>{this.props.data.system}</span></div>
        <BarChart width={window.innerWidth-40} height={600} data={this.props.data.sizeList} stackOffset="sign">
          <XAxis dataKey="size"/>
          <YAxis dataKey="total"/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          {this.renderShapesBars()}
        </BarChart>
      </div>
    );
  }
}