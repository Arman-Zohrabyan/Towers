/**
 * Join Page.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class JoinPage extends Component {
  constructor() {
    super();

    this.state = {
      nickname: '',
      isNicknameCorrect: false,
      dangerous: false
    };
  }

  /**
   * Nickname send function
   */
  handleOnClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { isNicknameCorrect } = this.state;

    if (isNicknameCorrect) {
      history.push('/boards');
    } else {
      this.setState({ dangerous: true });
    }
  }

  /**
   * Input value change function.
   */
  handleOnChange = (e) => {
    const { name, value } = e.target;

    const isNicknameCorrect = (value.trim().length > 2);
    this.setState({
      isNicknameCorrect,
      dangerous: false,
      [name]: value
    });
  }

  render() {
    const { dangerous, isNicknameCorrect, nickname } = this.state;
    const dangerousClass = dangerous ? 'joinContent-container__inputWrapper__icon2__dangerous' : '';

    return (
      <Fragment>
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
                onChange={this.handleOnChange}
                value={nickname}
                type='text'
                className='joinContent-container__inputWrapper__input'
                placeholder='Write Your Nickname'
                name='nickname'
                autoComplete='off'
              />
              {isNicknameCorrect ?
                <i className='fas fa-check joinContent-container__inputWrapper__icon1' /> :
                <i className={`fas fa-times joinContent-container__inputWrapper__icon2 ${dangerousClass}`} />
              }
            </span>
            <button
              id='canvas-button'
              onClick={this.handleOnClick}
            >
              Continue
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}


JoinPage.propTypes = {
  /**
   * browser history
   */
  history: PropTypes.object
};


export default withRouter(JoinPage);
