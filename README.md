Foot Shape Chart by Carl
=====================

This project was built with JavaScript as an exercise of frontend programming. It's a single page application showing a size distribution chart for shoe sizes. 
Size data is fetched from [Volumental](https://www.volumental.com/) sample API and rendered with [React](https://reactjs.org/) in a bar chart from [Recharts](http://recharts.org/#/en-US/). 

Thanks to Babel, this project uses ECMAScript 2017. An example is the use of async/await, which gets the response and passes the data to the state.

### Usage

```
git clone this project
cd into directory
npm install
npm start
open http://localhost:3000 in browser
```

### Dependencies

* [React](https://reactjs.org/)
* [webpack](https://webpack.js.org/)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [sass-loader](https://github.com/webpack-contrib/sass-loader)
* [Recharts](http://recharts.org/#/en-US/)

### More to ask for
This project doesn't use the latest versions of React, webpack or the webpack loaders. Before using this in a production environment, all frameworks and webpack configuration should be updated accordingly.

Styling is not prefixed to work with all browsers. To guarantee correct styling, use latest version of Chrome Browser.

Responsive design and breakpoints are not implemented in the application, though it looks okay on smaller devices too.  
