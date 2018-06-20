/**
 * Created By: Arman Zohrabyan
 */

import openSocket from 'socket.io-client';
import A from './A';
let socket;

class Socket {

  static init(userId) {
    socket = openSocket('http://localhost:4000');
    A.init(socket);
    socket.on('connect', () => {
      socket.emit('storeUserId', userId);
    });
  }

  static end() {
    socket.disconnect();
  }

}



/**/
function joinBoards() {
  socket.emit('socketJoinBoards');
}

function leaveBoards() {
  socket.emit('socketLeftBoards');
}
/**/


function getRooms(cb) {
  socket.on('getRooms', boards => cb(boards));
  socket.emit('getRooms');
}

function createRoom(userData) {
  socket.emit('createRoom', userData);
}

function joinToRoom(data) {
  socket.emit('joinToRoom', data);
}

function leftRoom(userId) {
  socket.emit('leaveRoom', userId);
}

function startingGame(roomId) {
  socket.emit('startStatus', roomId);
}

/**/
function joinSocketRoom(socketId) {
  socket.emit('socketJoinRoom', socketId);
}
function leaveSocketRoom(socketId) {
  socket.emit('socketJoinRoom', socketId);
}

function getGameData(roomId, cb) {
  socket.on('event', boards => cb(boards));
  socket.emit('event', roomId);
}
/**/

export default Socket;

// export { joinBoards, leaveBoards,
//   beginSocket, endSocket, getRooms, createRoom, joinToRoom, leftRoom, startingGame,
//   joinSocketRoom, leaveSocketRoom, getGameData };
