/**
 * Created By: Arman Zohrabyan
 *
 * Game page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../modules/User';
import Socket from '../../sockets';


class GamePage extends Component {
  constructor(props) {
    super(props);

    const data = User.data;

    this.state = {
      message: '',
      myId: data.id
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
  }

  componentWillUnmount() {
    this.mounted = false;
    Socket.leftRoom(this.state.myId);
    Socket.leaveSocketRoom();
  }

  handleBack = () => {
    this.props.history.push('/boards');
  }

  render() {
    return (
      <div onClick={this.handleBack}>
              GmaePage
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
