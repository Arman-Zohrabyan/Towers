/**
 * Created By: Arman Zohrabyan
 */

class BoardsMethods {
  static joinBoards() {
    this.socket.emit('socketJoinBoards');
  }

  static leaveBoards() {
    this.socket.emit('socketLeftBoards');
  }

  static getRooms(cb) {
    this.socket.on('getRooms', boards => cb(boards));
    this.socket.emit('getRooms');
  }

  static createRoom(userData) {
    this.socket.emit('createRoom', userData);
  }

  static joinToRoom(data) {
    this.socket.emit('joinToRoom', data);
  }

  static leftRoom(userId) {
    this.socket.emit('leaveRoom', userId);
  }

  static startingGame(roomId) {
    this.socket.emit('startStatus', roomId);
  }
}


export default BoardsMethods;
