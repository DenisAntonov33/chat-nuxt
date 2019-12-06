const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);
const { makeMessageObject } = require('../utils/index');
const users = require('./users')();

io.on('connection', (socket) => {
  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.room) {
      const err = { message: 'Invalid data' };
      return callback(err);
    }

    socket.join(data.room);

    users.remove(socket.id);

    users.add({ name: data.name, id: socket.id, room: data.room });

    callback(null, { ...data, userId: socket.id });

    io.to(data.room).emit('updateUsers', users.getByRoom(data.room));

    socket.emit(
      'newMessage',
      makeMessageObject('admin', `Welcome, ${data.name}`),
    );

    socket.broadcast
      .to(data.room)
      .emit(
        'newMessage',
        makeMessageObject('admin', `User, ${data.name} joined`),
      );
  });

  socket.on('createMessage', (data, callback) => {
    if (!data.text) {
      const err = { message: 'Text must be filled' };
      return callback(err);
    }

    const user = users.get(data.id);

    if (user) {
      io.to(user.room).emit(
        'newMessage',
        makeMessageObject(user.name, data.text, data.id),
      );
      callback();
    }
  });

  socket.on('userLeft', (id, callback) => {
    const user = users.remove(id);
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit(
        'newMessage',
        makeMessageObject('admin', `User ${user.name} left the chat`),
      );
    }
    callback();
  });

  socket.on('disconect', () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit(
        'newMessage',
        makeMessageObject('admin', `User ${user.name} left the chat`),
      );
    }
  });
});

module.exports = {
  app,
  server,
};
