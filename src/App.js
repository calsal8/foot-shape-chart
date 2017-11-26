import React, { Component } from 'react';
import SimpleChart from './components/SimpleChart'
import {} from './scss/main.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.fetchSizes = this.fetchSizes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
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

    try {
      const response = await fetch(url, { method: 'GET', headers: headers });

      if (response && response.status === 200) {
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
        }, []).sort((a, b) => a.size - b.size);

        return { system: data.system, gender: data.gender, sizeList, allShapes: allShapes, nextPage: responseJson['next-page'], status: response.status };
      } else {
        return { status: response.status };
      }
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }

  async handleClick() {
    this.setState({ data: null });
    const response = await this.fetchSizes(window.fetch, this.state.data.nextPage);
    this.setState({ data: response });
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    if (this.state.data !== null) {
      if (this.state.data.status === 200) {
        return (<div>
          <SimpleChart data={this.state.data}/>
          <button className='btn btn--center' onClick={this.handleClick}>Next page <i className="fa fa--hidden fa-paper-plane-o" aria-hidden="true"></i></button>
        </div>);
      } else if (this.state.data.status === 503) {
        return (<div><h2>Service is unavailable at the moment ({this.state.data.status})</h2><p>Try to reload the page and try again</p><button onClick={this.reloadPage} className='btn btn--center'>Reload now!<i className="fa fa--hidden fa-refresh" aria-hidden="true"></i></button></div>)
      } else {
        return (<div><h2>Something went wrong with the request</h2><p>Try again or contact admin</p><button onClick={this.reloadPage} className='btn btn--center'>Reload now!<i className="fa fa--hidden fa-refresh" aria-hidden="true"></i></button></div>)
      }
    } else {
      return (<div className='spinner'></div>);
    }
  }
}
