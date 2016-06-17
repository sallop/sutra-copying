// var MessageSection = require('./MessageSection.react');
// var ThreadSection = require('./ThreadSection.react');

var React = require('react');

var ChatApp = React.createClass({
  render: function() {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    );
  }
});

function getStateFromStores() {
  return {
    // threads:,
    // currentThreadID:,
    // unreadCount
  };
}

var ThreadSection = React.createClass({
  getInitialState: function() {
    //console.log("getInitialState");
    //return getStateFromStores();
    return { 
      threads: [
        { id: 1, name: "Bob", lastMessage: { text:"Bob is dead. Because of us." }},
        { id: 2, name: "Edward", lastMessage: { text: "Tyler doesn't here. Tyler went away." }},
        { id: 3, name: "Marla", lastMessage: { text: "My God. I haven't been fucked like that since grade school."}}
      ],
      currentThreadID: "1",
      unreadCount: 0
    };
  },

  componentDidMount: function() {
    console.log("componentDidMount");
    console.log("ThreadStore.addChangeListener(this._onChange);");
    console.log("UnreadThreadStore.addChangeListener(this._onChange);");
    // ThreadStore.addChangeListener(this._onChange);
    // UnreadThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    console.log("ThreadStore.removeChangeListener(this._onChange);");
    console.log("UnreadThreadStore.removeChangeListener(this._onChange);");
    // ThreadStore.removeChangeListener(this._onChange);
    // UnreadThreadStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var threads = [
      { id: 1, name: "Bob", lastMessage: { text:"Bob is dead. Because of us."} },
      { id: 2, name: "Edward", lastMessage: { text: "Tyler doesn't here. Tyler went away." }},
      { id: 3, name: "Marla", lastMessage: { text: "My God. I haven't been fucked like that since grade school."}}
    ];
    //var threadListItems = "Not Implemented Yet";
    //var threadListItems = this.state.thread.map((thread)=>{
    var threadListItems = this.state.threads.map((thread)=>{
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
        );
    }, this);
    var unread = this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;

    return (
        <div className="thread-section">
          <div className="thread-count">
            {unread}
          </div>
          <ul className="thread-list">
            {threadListItems}
          </ul>
        </div>
    );
  },

  _onChange: function() {
    console.log("ThreadSection");
    console.log("_onChange");
    //this.setState(getStateFromStores());
  }
});

var ThreadListItem = React.createClass({
  propTypes: {
    thread: React.PropTypes.object,
    currentThreadID: React.PropTypes.string
  },
  render: function() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;
    // className={classNames({
    //   'thread-list-item': true,
    //   'active': thread.id === this.props.currentThreadID
    // })}
    return (
      <li
        onClick={this._onClick}>
        <h5 className="thread-name">{thread.name}</h5>
        <div className="thread-time">
          lastMessage.date.toLocaleTimeString()
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  },
  _onClick: function() {
    console.log("ChatThreadActionCreators.clickThread(this.props.thread.id);");
    //ChatThreadActionCreators.clickThread(this.props.thread.id);
  }
});

function getMessageListItem(message) {
  return (
      <MessageListItem
        key={message.id}
        message={message}
      />
  );
}

var MessageSection = React.createClass({
  getInitialState: function() {
    // return getStateFromStores();
    return {
      messages: [
        {id:1, authorName:"Edward", date:"", text:"Tyler doesn't here. Tyler went away."},
        {id:2, authorName:"Tyler", date:"", text:"I didn't create some loser alter-ego to make myself feel better. Take some responsibility!"},
        {id:3, authorName:"Marla", date:"", text:"My God. I haven't been fucked like that since grade school."}],
      thread: { id: "0", name: "space monkey", lastMessage:{}}
    };
  },
  componentDidMount: function() {
    // this._scrollToBottom();
    // MessageStore.addChangeListener(this._onChange);
    // ThreadStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    // MessageStore.removeChangeListener(this._onChange);
    // ThreadStore.removeChangeListener(this._onChange);
  },
  render: function () {
    // var messageListItems = "this.state.messages.map(getMessageListItem);";
    var messageListItems = this.state.messages.map(getMessageListItem);
    
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">this.state.thread.name</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.thread.id} />
      </div>
    );
  },
  componentDidUpdate: function() {
    console.log("this._scrollToBottom();");
    //this._scrollToBottom();
  },
  _scrollToBottom: function() {
    console.log("_scrollToBottom");
    // var ul = this.refs.messageList.getDOMNode();
    // ul.scrollTop = ui.scrollHeight;
  },
  _onChange: function() {
    console.log("MessageSection");
    console.log("_onChange");
  }
});

var MessageListItem = React.createClass({
  propTypes: {
    message: React.PropTypes.object
  },
  render: function (){
    var message = this.props.message;
    return (
      <li className="message-list-item">
        <h5 className="message-author-name">{message.authorName}</h5>
        <div className="message-time">
          message.date.toLocaleTimeString()
        </div>
        <div className="message-text">
          {message.text}
        </div>
      </li>
    );
  }
});

var MessageComposer = React.createClass({
  propTypes: {
    threadID: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {text: 'Message Composer(This comment will be removed.)'};
  },
  render: function() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
      );
  },
  _onChange: function(event, value) {
    console.log("_onChange()");
    console.log("this.setState({text: event.target.value});");
    //this.setState({text: event.target.value});
  },
  _onKeyDown: function(event) {
    console.log("_onKeyDown()");
    console.log("ChatMessageActionCreators.createMessage(text,this.props.threadID);");
    console.log("this.setState({text:''}");
  }
});

module.exports = ChatApp;
