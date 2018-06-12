import React, { Component } from 'react';
import Room from './Room.jsx';
import User from '../../modules/User';

import { beginSocket, endSocket, getBoards } from './BoardsSocket';
import './BoardsPage.scss';



class BoardsPage extends Component {
  componentDidMount() {
    beginSocket();
    getBoards((boards) => console.log(boards))
  }

  componentWillUnmount() {
    endSocket();
  }

  send = () => {
    // this.socket.emit('CreateBoard', 'board')
  }

  render() {
    const my = User.data;

    return (
      <div className='boardsPage'>
        <div className='boardsPage-container'>
          <div className='boardsPage-container__header'>
            <span className='boardsPage-container__header__h1'>GAME BOARDS</span>
            <span className='boardsPage-container__header__you'>
              <span>Your Nickname:</span>
              <span>{` ${my.nickname}`}</span>
            </span>
            <div className='boardsPage-button' onClick={this.send}>
              <p className='boardsPage-button__btnText'>CREATE NEW GAME</p>
              <div className='boardsPage-button__btnTwo'>
                <p className='boardsPage-button__btnText2'>
                  <i className='fas fa-plus' />
                </p>
              </div>
            </div>
          </div>

          <Room
            createdBy='Valodik'
            status={0}
            iAmIn={false}
            onRoom={1}
            myId={my.id}
          />
          <Room
            createdBy='ME'
            status={1}
            iAmIn
            onRoom={2}
            myId={my.id}
          />
          <Room
            createdBy='Valodik'
            status={1}
            iAmIn
            onRoom={2}
            myId={my.id}
          />
          <Room
            createdBy='Valodik'
            status={1}
            iAmIn={false}
            onRoom={2}
            myId={my.id}
          />
          <Room
            createdBy='Valodik'
            status={0}
            iAmIn
            onRoom={1}
            myId={my.id}
          />
          <Room
            createdBy='Valodik'
            status={2}
            iAmIn={false}
            onRoom={5}
            myId={my.id}
          />

        </div>
      </div>
    );
  }
}


export default BoardsPage;
