/**
 * Created By: Arman Zohrabyan
 */

import onlyStatics from '../utility/multiInheritance';
import openSocket from 'socket.io-client';
import BoardsMethods from './BoardsMethodsClass';
import GameMethods from './GameMethodsClass';


class Socket extends onlyStatics(BoardsMethods, GameMethods) {
  static init(userId) {
    this.socket = openSocket('http://localhost:4000');
    this.socket.on('connect', () => {
      this.socket.emit('storeUserId', userId);
    });
  }

  static end() {
    this.socket.disconnect();
  }
}


export default Socket;
