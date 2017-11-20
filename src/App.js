import React, { Component } from 'react';
import SimpleChart from './components/SimpleChart'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.fetchSizes = this.fetchSizes.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentWillMount() {
    const response = await this.fetchSizes(window.fetch);
    this.setState({ data: response });
  }

  async fetchSizes(fetch, page = null) {
    const username = 'admin';
    const password = 'ToPsEcReT';
    let url = 'http://homeexercise.volumental.com/sizingsample';
    page ? url += '?page=' + page : null;
    const headers = new Headers();
    const decodedCredentials = window.btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${decodedCredentials}`);

    const response = await fetch(url, { method: 'GET', headers: headers });
    const responseJson = await response.json();
    const data = responseJson.data[0];
    const sizes = data.sizes;
    const allShapes = [];

    const sizeList = Object.keys(sizes).reduce((arr, size) => {
      const sizeObj = Object.keys(sizes[size]).reduce((obj, shapeName) => {
        obj.size = size;
        obj.shapes.push({ name: shapeName, value: sizes[size][shapeName] });
        obj[shapeName] = sizes[size][shapeName];
        allShapes.indexOf(shapeName) === -1 ? allShapes.push(shapeName) : null;
        obj.total += sizes[size][shapeName];
        return obj;
      }, { shapes: [], total: 0 });
      arr.push(sizeObj);
      return arr;
    }, []);
    return { system: data.system, gender: data.gender, sizeList, allShapes: allShapes, nextPage: responseJson['next-page'] };
  }

  render() {
    if (this.state.data != null) {
      return (<div>
        <div>Gender: {this.state.data.gender}</div>
        <div>System: {this.state.data.system}</div>
        <div>NP: {this.state.data.nextPage}</div>
        <SimpleChart data={this.state.data}/>
        <button onClick={this.handleClick}>Next page</button>
      </div>);
    } else {
      return (
        <h1>Loading</h1>
      );
    }
  }
}
