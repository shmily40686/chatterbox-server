// YOUR CODE HERE:

var app = { 
  'server': 'http://127.0.0.1:3000',
  'roomname': 'all',
  'friends': new Set(),
  'username': 'Anonymous Hacker'
};

app.init = function() {
  $( document ).ready(function() {
    $('#submit').on('click', sendMessage);
    $('#namesubmit').on('click', updateUsername);
    $('#chats').on('click', '.username', addFriend);
    $('#roombutton').on('click', addRoom);
    app.fetch();
    setInterval(app.fetch, 5000);
  });
};

app.send = function(message) {
  $.ajax({
    url: app.server + '/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
  
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.fetch();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    },
  });
};

app.fetch = function() {
  app.clearMessages();
  $.ajax({
    url: app.server + '/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      data = JSON.parse(data);
      console.log('fetched', data.results);
      getRoomnames(data.results);
      displayMessages(data.results);
    },
    error: function(data) {
      console.log('error');
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
  $('#roomSelector').html('<option value="all">All Messages</option>');
};

app.handleUsernameClick = function() {   
};

app.handleSubmit = function(text) {
  renderMessage({'text': text, 'username': 'FILL-ME-IN'});
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<p>' + roomName + '</p>');
};


/*
 * 
 * Helper functions
 *
 */
var addFriend = function (e) {
  app.friends.add(e.target.textContent.slice(0, -3));
}; 

var sendMessage = function () {
  var msg = $('#messageBox');
  app.send({
    username: app.username,
    text: msg.val(),
    roomname: app.roomname
  });
};

var updateUsername = function () {
  app.username = $('#nameBox').val();
};

var changeRoom = function() {
  var roomname = $('#roomSelector').val();
  app.roomname = roomname;
  app.fetch();
};

var getRoomnames = function(data) {
  var rooms = new Set();
  for (var i = 0; i < data.length; i++) {
    rooms.add(data[i].roomname);
  }
  rooms.forEach(function(item) {
    $('#roomSelector').append(`<option value="${item}">${item}</option>`);
  });
};

var addRoom = function () {
  sendMessage({ username: app.username,
    text: '',
    roomname: $('#createRoom').val()
  });
};

var displayMessages = function(data) {
  for (var i = 0; i < data.length; i++) {
    renderMessage(data[i]);
  }
};

var renderMessage = function (msg) {
  console.log(msg)
  if (msg.text === '') {
    return;
  }

  if (msg.text.length > 1000) {
    msg.text = msg.text.slice(0, 1000);
  }    

  if (app.roomname !== 'all' && msg.roomname !== app.roomname) {
    return;
  }

  for (var i in msg) {
    msg[i] = sanitizeHtml(msg[i]);
  }

  if (app.friends.has(msg.username)) { 
    $('#chats').append(`<div class='messageBox'><span class='username'>${msg['username']}:  </span><span class='message friend'>${msg['text']}</span></div>`);
  } else {

    $('#chats').append(`<div class='messageBox'><span class='username'>${msg['username']}:  </span><span class='message'>${msg['text']}</span></div>`);
  }
};

app.init();