import React, { Component } from 'react';
import Room from './Room.jsx';
import User from '../../modules/User';

import Helper from '../../../common/helper';
import './BoardsPage.scss';
import {
    beginSocket,
    endSocket,
    getRooms,
    createRoom,
    joinToRoom,
    leftRoom,
    startingGame
} from '../../sockets';

const colors = ['yellow', 'green', 'red'];


class BoardsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: {}
        };
    }

    componentDidMount() {
        beginSocket(User.data.id);

        getRooms((rooms) => {
            this.setState({ rooms });
        });
    }

    componentWillUnmount() {
        endSocket();
    }

  create = (myId, myNickname) => {
      createRoom({ id: myId, nickname: myNickname });
  }

  join = (myId, roomId) => {
      joinToRoom({ roomId, userId: myId });
  }

  left = (userId) => {
      leftRoom(userId);
  }

  start = (roomId) => {
      startingGame(roomId);
  }

  render() {
      const my = User.data;
      const { rooms } = this.state;
      const iAmAlreadyCreatedTheRoom = Object.keys(rooms).includes(my.id);
      const iAmInTheRoom = !!Helper.userPosition(rooms, my.id);


      return (
          <div className='boardsPage'>
              <div className='boardsPage-container'>
                  <div className='boardsPage-container__header'>
                      <span className='boardsPage-container__header__h1'>GAME BOARDS</span>
                      <span className='boardsPage-container__header__you'>
                          <span>Your Nickname:</span>
                          <span>{` ${my.nickname}`}</span>
                      </span>
                      {
                          iAmAlreadyCreatedTheRoom || iAmInTheRoom ?
                              <span className='boardsPage-container__header__info'>You already in the room.</span> :
                              <div className='boardsPage-button' onClick={this.create.bind(this, my.id, my.nickname)}>
                                  <p className='boardsPage-button__btnText'>CREATE NEW GAME</p>
                                  <div className='boardsPage-button__btnTwo'>
                                      <p className='boardsPage-button__btnText2'>
                                          <i className='fas fa-plus' />
                                      </p>
                                  </div>
                              </div>
                      }
                  </div>
                  {
                      Object.keys(rooms).map((id, key) => {
                          const room = rooms[id];
                          room.id = id;

                          let handleClickEvent = () => (this.join(my.id, room.id));
                          let additionalClasses = ` ${colors[room.status]}`;

                          if (iAmInTheRoom) {
                              const iAmInThisRoom = room.usersList.includes(my.id);
                              if (iAmInThisRoom) {
                                  handleClickEvent = () => (this.left(my.id));
                                  additionalClasses += ' boardsPage-room__iAmIn';
                              }
                              if (room.id === my.id && room.status === 1) {
                                  handleClickEvent = () => (this.start(room.id));
                                  additionalClasses += ' boardsPage-room__ready';
                              } else if (!iAmInThisRoom) {
                                  handleClickEvent = () => (console.warn('Please wait.'));
                                  additionalClasses += ' boardsPage-room__hide';
                              }
                          } else if (room.status === 1) {
                              handleClickEvent = () => (console.warn('Please wait.'));
                              additionalClasses += ' boardsPage-room__hide';
                          } else if (room.status === 2) {
                              handleClickEvent = () => (this.join(my.id, room.id));
                              additionalClasses += ' boardsPage-room__started';
                          }

                          return (
                              <Room
                                  key={key}
                                  myId={my.id}
                                  room={room}
                                  handleClick={handleClickEvent}
                                  additionalClass={additionalClasses}
                              />
                          );
                      })
                  }
              </div>
          </div>
      );
  }
}


export default BoardsPage;
