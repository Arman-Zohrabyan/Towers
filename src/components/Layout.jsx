/**
 * Created By: Arman Zohrabyan
 *
 * Layout Component.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import User from '../modules/User';
import toggleScreen from '../utility/toggleScreen';
import { beginSocket, endSocket } from '../sockets';

import Loading from './Loading.jsx';


class Layout extends React.Component {
  constructor() {
    super();
    beginSocket(User.data.id);

    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    const that = this;
    window.onload = function () {
      that.setState({ isReady: true });
    };
  }

  componentWillUnmount() {
    endSocket();
  }

  render() {
    return (
      <Fragment>
        { !this.state.isReady && <Loading /> }

        <div className='toggleScreenButton' onClick={toggleScreen} />

        <div id='main'>
          {this.props.children}
        </div>

      </Fragment>
    );
  }
}


Layout.propTypes = {
  /**
   * Page component or container
   */
  children: PropTypes.element.isRequired
};


export default Layout;
