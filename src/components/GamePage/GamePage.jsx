/**
 * Created By: Arman Zohrabyan
 *
 * Game page.
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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

    back = () => {
      this.props.history.push('/boards');
    }

    render() {
      console.log(this.state.message);
      return (
        <div onClick={this.back}>
                GmaePage
        </div>
      );
    }
}


// GamePage.propTypes = {
/**
   * browser history
   */
// history: PropTypes.object
// };


export default GamePage;
