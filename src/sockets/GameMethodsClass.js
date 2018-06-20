/**
 * Created By: Arman Zohrabyan
 */

class GameMethods {
  static joinSocketRoom(socketId) {
    this.socket.emit('socketJoinRoom', socketId);
  }
  static leaveSocketRoom(socketId) {
    this.socket.emit('socketJoinRoom', socketId);
  }

  static getGameData(roomId, cb) {
    this.socket.on('event', boards => cb(boards));
    this.socket.emit('event', roomId);
  }
}


export default GameMethods;
