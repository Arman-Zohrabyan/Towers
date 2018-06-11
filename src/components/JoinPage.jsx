import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import scripts from '../utility/canvas-scripts';
import htmlUtility from '../utility/HTML_utility';


class JoinPage extends Component {
  constructor() {
    super();

    this.state = {
      nickname: '',
      isNicknameCorrect: false
    };
  }

  handleOnClick = (e) => {
    e.preventDefault();
    const { history } = this.props; 

    setTimeout(() => {
      history.push('/boards');
    }, 200);
  }

  onChangeHandle = (e) => {
    const { name, value } = e.target;
    const isNicknameCorrect = (value.trim().length > 2);
    this.setState({
      isNicknameCorrect,
      [name]: value
    });
  }

  render() {
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
            <input
              type='text'
              id='canvas-input'
              placeholder='Write Your Nickname'
              name='nickname'
              autoComplete='off'
            />
            <button
              id='canvas-button'
              onClick={this.handleOnClick}
            >
                          Continue
            </button>
          </div>
        </div>

        <div ref={htmlUtility.setDangerousHtml.bind(null, scripts.canvasButton + scripts.canvasInput)} />
      </Fragment>
    );
  }
}


export default withRouter(JoinPage);
