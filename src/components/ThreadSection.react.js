var React = require('react');
var ThreadListItem = require('../components/ThreadListItem.react');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  };
}

var ThreadSection = React.createClass({
  getInitialState: function() {
    var state = getStateFromStores();
    console.log(state);
    //console.log("getInitialState");
    return state;
    // return { 
    //   threads: [
    //     { id: 1, name: "Bob", lastMessage: { text:"Bob is dead. Because of us." }},
    //     { id: 2, name: "Edward", lastMessage: { text: "Tyler doesn't here. Tyler went away." }},
    //     { id: 3, name: "Marla", lastMessage: { text: "My God. I haven't been fucked like that since grade school."}}
    //   ],
    //   currentThreadID: "1",
    //   unreadCount: 0
    // };
  },

  componentDidMount: function() {
    console.log("componentDidMount");
    console.log("ThreadStore.addChangeListener(this._onChange);");
    console.log("UnreadThreadStore.addChangeListener(this._onChange);");
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    console.log("ThreadStore.removeChangeListener(this._onChange);");
    console.log("UnreadThreadStore.removeChangeListener(this._onChange);");
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  },

  render: function() {
    //var threads = [
    //  { id: 1, name: "Bob", lastMessage: { text:"Bob is dead. Because of us."} },
    //  { id: 2, name: "Edward", lastMessage: { text: "Tyler doesn't here. Tyler went away." }},
    //  { id: 3, name: "Marla", lastMessage: { text: "My God. I haven't been fucked like that since grade school."}}
    //];
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
    });
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
    this.setState(getStateFromStores());
  }
});

module.exports = ThreadSection;
