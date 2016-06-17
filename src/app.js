import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/ChatApp.react';
// import ChatExampleData = from './ChatExampleData';
// import ChatWebAPIUtils from './utils/ChatWebAPIUtils';

// ChatExampleData.init(); // load example data into localstorage

// ChatWEbAPIUtils.getAllMessages();

// const ChatApp = React.createClass({
//   render: function() {
//     return (<div>Text text</div>);
//   }
// });

ReactDOM.render(<ChatApp/>, document.getElementById('container'));

