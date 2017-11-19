import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  render() {
    if (this.state.data != null) {
      return (<div>Hello data</div>);
    }

    return (
      <h1>Hello, world without data.</h1>
    );
  }
}
