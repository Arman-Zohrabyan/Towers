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
}


export default ChatMethods;
