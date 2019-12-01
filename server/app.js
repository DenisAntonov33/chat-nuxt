const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.room) {
      const err = { message: 'Invalid data' };
      return callback(err);
    }

    callback(null, { ...data, userId: socket.id });
  });

  socket.on('createMessage', (payload) => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: payload.text + ' FROM SERVER',
      });
    }, 500);
  });
});

module.exports = {
  app,
  server,
};
