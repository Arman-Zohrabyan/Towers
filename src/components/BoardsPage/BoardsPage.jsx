import React, { Component } from 'react';
import './BoardsPage.scss';

import Room from './Room.jsx';


class BoardsPage extends Component {
  render() {
    return (
      <div className='boardsPage'>
        <div className='boardsPage-container'>
          <div className='boardsPage-container__header'>
            <span className='boardsPage-container__header__h1'>GAME BOARDS</span>
            <span className='boardsPage-container__header__you'>
              <span>Your Nickname:</span>
              <span> asdasdasd</span>
            </span>
            <div className='boardsPage-button'>
              <p className='boardsPage-button__btnText'>CREATE NEW GAME</p>
              <div className='boardsPage-button__btnTwo'>
                <p className='boardsPage-button__btnText2'>
                  <i className='fas fa-plus' />
                </p>
              </div>
            </div>
          </div>

          <Room createdBy='Valodik' status={0} iAmIn={false}
            onRoom={1}
          />
          <Room createdBy='ME' status={1} iAmIn
            onRoom={2}
          />
          <Room createdBy='Valodik' status={1} iAmIn
            onRoom={2}
          />
          <Room createdBy='Valodik' status={1} iAmIn={false}
            onRoom={2}
          />
          <Room createdBy='Valodik' status={0} iAmIn
            onRoom={1}
          />
          <Room createdBy='Valodik' status={2} iAmIn={false}
            onRoom={5}
          />
        </div>
      </div>
    );
  }
}


export default BoardsPage;
