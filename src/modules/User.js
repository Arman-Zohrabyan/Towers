import jwt from "jsonwebtoken";


class User {

  static set token(token) {
    localStorage.setItem('token', token);
  }

  static get isJoined() {
    return localStorage.getItem('token') !== null;
  }

  static get removeToken() {
    localStorage.removeItem('token');
  }

  static get data() {
    let token = localStorage.getItem('token');
    if(token) {
      const user = jwt.decode(token);
      return user;
    }
    return {};
  }
}


export default User;
