var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var MessageStore = require('../stores/MessageStore');
var React = require('react');
var ThreadStore = require('../stores/ThreadStore');

function getStateFromStores() {
  console.log("getStateFromStores()");
  console.log(MessageStore.getAllForCurrentThread());
  console.log(ThreadStore.getCurrent());
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
  };
}

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
    return getStateFromStores();
    //return {
    //  messages: [
    //    {id:1, authorName:"Edward", date:"", text:"Tyler doesn't here. Tyler went away."},
    //    {id:2, authorName:"Tyler", date:"", text:"I didn't create some loser alter-ego to make myself feel better. Take some responsibility!"},
    //    {id:3, authorName:"Marla", date:"", text:"My God. I haven't been fucked like that since grade school."}],
    //  thread: { id: "0", name: "space monkey", lastMessage:{}}
    //};
  },
  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },
  render: function () {
    // var messageListItems = "this.state.messages.map(getMessageListItem);";
    var messageListItems = this.state.messages.map(getMessageListItem);

    console.log("MessageSection.render()");
    console.log(this.state.thread);
    
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID="0" />
      </div>
    );
    // <MessageComposer threadID={this.state.thread.id} />
  },

  componentDidUpdate: function() {
    console.log("this._scrollToBottom();");
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    console.log("_scrollToBottom");
    console.log(this.refs.messageList);
    //var ul = this.refs.messageList.getDOMNode(); .getDOMNOde work until v0.15
    var ul = this.refs.messageList;
    ul.scrollTop = ul.scrollHeight;
  },
  _onChange: function() {
    console.log("MessageSection");
    console.log("_onChange");
    this.setState(getStateFromStores());
  }
});

module.exports = MessageSection;
