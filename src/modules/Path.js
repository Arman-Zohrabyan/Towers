/**
 * Created By: Arman Zohrabyan
 */

import jwt from 'jsonwebtoken';


class Path {
  static get isLoggedIn() {
    return [
      '/boards',
      '/room/:socketId'
    ];
  }
}


export default Path;
