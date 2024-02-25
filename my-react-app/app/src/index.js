const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App').default; // Notice the .default here

ReactDOM.render(React.createElement(App), document.getElementById('root'));
