var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

module.exports = {

  getAllMessages: function() {
    var rawMessages = JSON.parse(localStorage.getItem('messages'));

    console.log("ChatWebApiUtils.js");
    console.log( rawMessages );

    // simulate success callback
    ChatServerActionCreators.receiveAll(rawMessages);
  },

  createMessage: function(message, threadName) {
    // simulate writing to a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createMessage = {
      id: id,
      threadID: threadName,
      threadName: threadName,
      text: message.text,
      timestamp: timestamp
    };
    rawMessages.push(createMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    setTimeout(()=>{
      ChatServerActionCreators.receiveCreatedMessage(createMessage);
    }, 0);
  }
};
