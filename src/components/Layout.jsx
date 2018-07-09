/**
 * Created By: Arman Zohrabyan
 *
 * Layout Component.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import toggleScreen from '../utility/toggleScreen';
import User from '../modules/User';
import Socket from '../sockets';
import Loading from './Loading.jsx';
import Chat from '../containers/Chat.jsx';


class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      socketIsRunning: false
    };
  }

  componentDidMount() {
    const that = this;
    window.onload = function () {
      that.setState({ isReady: true });
    };
  }

  componentWillUnmount() {
    this.state.socketIsRunning && Socket.end();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = nextProps.history.location;

    if (!prevState.socketIsRunning && pathname !== '/join') {
      Socket.init(User.data.id);

      return {
        ...prevState,
        socketIsRunning: true
      };
    } else if (prevState.socketIsRunning && pathname === '/join') {
      Socket.end();

      return {
        ...prevState,
        socketIsRunning: false
      };
    }

    return null;
  }

  render() {
    return (
      <Fragment>
        { !this.state.isReady && <Loading /> }

        <div className='toggleScreenButton' onClick={toggleScreen} />

        <div id='main'>
          {this.props.children}
        </div>

        { User.isJoined && <Chat myData={User.data} /> }
      </Fragment>
    );
  }
}


Layout.propTypes = {
  /**
   * Page component or container
   */
  children: PropTypes.element.isRequired,
  /**
   * Browser history
   */
  history: PropTypes.object
};


export default withRouter(Layout);
