/**
 * Created By: Arman Zohrabyan
 *
 * Join Page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JoinPage.scss';


class JoinPage extends Component {
  render() {
    const {
      dangerousClass,
      handleChange,
      handleClick,
      inputVal,
      isCorrect
    } = this.props;

    return (
      <div className='joinContent'>
        <div className='on2 joinContent__siteTitle'>
          <div className='marker1' />
          <div>T</div>
          <div className='letter-o'>O</div>
          <div className='letter-w'>W</div>
          <div className='letter-e'>E</div>
          <div className='letter-r'>R</div>
          <div>S</div>
          <div className='marker2' />
        </div>
        <div className='joinContent-container'>
          <span className='joinContent-container__inputWrapper'>
            <input
              onChange={handleChange}
              value={inputVal}
              type='text'
              className='joinContent-container__inputWrapper__input'
              placeholder='Write Your Nickname'
              name='nickname'
              autoComplete='off'
            />
            {isCorrect ?
              <i className='fas fa-check joinContent-container__inputWrapper__icon1' /> :
              <i className={`fas fa-times joinContent-container__inputWrapper__icon2 ${dangerousClass}`} />
            }
          </span>
          <button
            className='joinContent-container__button'
            onClick={handleClick}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
}


JoinPage.propTypes = {
  /**
   * Dangerouse class
   */
  dangerousClass: PropTypes.string,
  /**
   * Change input value handle function
   */
  handleChange: PropTypes.func,
  /**
   * Send nickname handle function
   */
  handleClick: PropTypes.func,
  /**
   * Input value
   */
  inputVal: PropTypes.string,
  /**
   * Input value validator
   */
  isCorrect: PropTypes.any
};


export default JoinPage;
