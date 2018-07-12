/**
 * Created By: Arman Zohrabyan
 *
 * Game page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GamePage.scss';
import User from '../../modules/User';
import Socket from '../../sockets';


class GamePage extends Component {
  constructor(props) {
    super(props);

    const data = User.data;

    this.state = {
      message: '',
      myId: data.id,
      screen: {
        width: 0,
        height: 0
      },
      context: null,
      currentGold: 100,
      inGame: false
    };
  }

  componentDidMount() {
    const { socketId } = this.props.match.params;
    Socket.joinSocketRoom(this.state.myId);

    // TODO:   this.mounted   so bad solution!
    this.mounted = true;
    Socket.getGameData(socketId, (message) => {
      if (this.mounted) {
        this.setState({ message });
      }
    });
    this.handleResize();
    window.addEventListener('resize',  this.handleResize.bind(this, false));
  }

  componentWillUnmount() {
    this.mounted = false;
    Socket.leftRoom(this.state.myId);
    Socket.leaveSocketRoom();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      screen : {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    });
  }

  handleBack = () => {
    this.props.history.push('/boards');
  }

  render() {
    return (
      <div>
        <div className='exitButton' onClick={this.handleBack} />
        <canvas ref='canvas'
          width={this.state.screen.width}
          height={640}
          style={{ 'width': '100%', 'height': this.state.screen.height }}
        />
      </div>
    );
  }
}


GamePage.propTypes = {
  /**
   * Props from router path
   */
  match: PropTypes.object,
  /**
   * Browser history
   */
  history: PropTypes.object
};


export default GamePage;
