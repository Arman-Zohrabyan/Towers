import React, { Component } from 'react';
import Room from './Room.jsx';
import User from '../../modules/User';

import { beginSocket, endSocket, getRooms, createRoom, joinToRoom } from './BoardsSocket';
import './BoardsPage.scss';



class BoardsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: {}
    }
  }

  componentDidMount() {
    beginSocket(User.data.id);

    getRooms((rooms) => {
      this.setState({rooms});
    })
  }

  componentWillUnmount() {
    endSocket();
  }

  create = (myId, myNickname) => {
    createRoom({id: myId, nickname: myNickname});
  }

  join = (myId, roomId) => {
    joinToRoom({id: myId, room: roomId});
  }

  render() {
    const my = User.data;
    const { rooms } = this.state;
    const iAlreadyCreatedRoom = Object.keys(rooms).includes(my.id);

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
              iAlreadyCreatedRoom ?
              <span className='boardsPage-container__header__info'>You already created a room.</span> :
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
            Object.keys(rooms).map( (id, key) => {
              const room = rooms[id];
              room.id = id;

              return <Room key={key} myId={my.id} room={room} handleClick={this.join} />
            })
          }
        </div>
      </div>
    );
  }
}


export default BoardsPage;
