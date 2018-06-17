/**
 * Created By: Arman Zohrabyan
 *
 * Join Page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../modules/User';
import JoinPage from '../../components/JoinPage/JoinPage.jsx';


class Join extends Component {
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
      const { isNicknameCorrect, nickname } = this.state;

      if (isNicknameCorrect) {
          fetch('/api/createUser/' + nickname)
              .then(res => res.json())
              .then(res => {
                  User.token = res.token;
                  history.push('/boards');
              });
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
          <JoinPage
              dangerousClass={dangerousClass}
              handleChange={this.handleOnChange}
              handleClick={this.handleOnClick}
              inputVal={nickname}
              isCorrect={isNicknameCorrect}
          />
      );
  }
}

export default Join;
