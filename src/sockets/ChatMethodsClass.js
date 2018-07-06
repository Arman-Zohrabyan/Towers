/**
 * Created By: Arman Zohrabyan
 */

class ChatMethods {
  static getMessage(cb) {
    this.socket.on('newMessage', messageData => cb(messageData));
  }

  static sentMessage(messageData) {
    this.socket.emit('newMessage', messageData);
  }

  static usersOnline(cb) {
    this.socket.on('usersOnline', countOfUsers => cb(countOfUsers));
  }
}


export default ChatMethods;
