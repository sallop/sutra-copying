import ChatApp from './components/ChatApp.react';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from './utils/ChatWebAPIUtils';

import React from 'react';
import ReactDOM from 'react-dom';
// window.React = React; // export for http://fb.me.react-devtools

ChatExampleData.init(); // load example data into localstorage
ChatWebAPIUtils.getAllMessages();

ReactDOM.render(<ChatApp/>, document.getElementById('container'));

