import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  async componentWillMount() {
    const response = await this.fetchSizes(window.fetch);
    this.setState({ data: response });
  }

  async fetchSizes(fetch, page = null) {
    const username = 'admin';
    const password = 'ToPsEcReT';
    const url = 'http://homeexercise.volumental.com/sizingsample';
    const headers = new Headers();
    const decodedCredentials = window.btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${decodedCredentials}`);

    const response = await fetch(url, { method: 'GET', headers: headers });
    const responseJson = await response.json();
    const data = responseJson.data[0];
    const sizes = data.sizes;
    const gender = data.gender;
    const system = data.system;
    const nextPage = responseJson['next-page'];
    const allShapes = [];

    const sizeList = Object.keys(sizes).reduce((arr, size) => {
      const sizeObj = Object.keys(sizes[size]).reduce((obj, shapeName) => {
        obj.size = size;
        obj.shapes.push({ name: shapeName, value: sizes[size][shapeName] });
        obj.total += sizes[size][shapeName];
        return obj;
      }, { shapes: [], total: 0 });
      arr.push(sizeObj);
      return arr;
    }, []);
    console.log(sizeList);
    return { system, gender, sizeList, allShapes, nextPage };
  }

  renderSizeChart() {
    return this.state.data.sizeList.map((size, key) => {
      return <li key={key}>{size.size} - Total: {size.total}</li>;
    });
  }

  render() {
    if (this.state.data != null) {
      return (<div>
        <div>Gender: {this.state.data.gender}</div>
        <div>Size system: {this.state.data.system}</div>
        <div>NP: {this.state.data.nextPage}</div>
        <ul>{this.renderSizeChart()}</ul>
      </div>);
    } else {
      return (
        <h1>Hello, world without data</h1>
      );
    }

  }
}
