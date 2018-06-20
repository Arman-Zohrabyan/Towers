/**
 * Created By: Arman Zohrabyan
 *
 * Game page.
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  joinSocketRoom,
  leaveSocketRoom,
  getGameData
} from '../../sockets';
import A from '../../sockets/A';


class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    console.log(A.print());
    const { socketId } = this.props.match.params;
    joinSocketRoom(socketId);

    // TODO:   this.mounted   so bad solution!
    this.mounted = true;
    getGameData(socketId, (message) => {
      if (this.mounted) {
        this.setState({ message });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    leaveSocketRoom();
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
