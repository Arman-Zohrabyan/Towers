/**
 * Created By: Arman Zohrabyan
 */

import jwt from 'jsonwebtoken';


class User {
  static set token(token) {
    localStorage.setItem('token', token);
  }

  static get token() {
    return localStorage.getItem('token');
  }

  static get isJoined() {
    return User.token !== null;
  }

  static get removeToken() {
    localStorage.removeItem('token');
  }

  static get data() {
    const { token } = User;
    if (token) {
      const user = jwt.decode(token);
      return user;
    }
    return {};
  }
}


export default User;
