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
        height: 0,
        coefficient: 0
      },
      mouseCoordinates: {
        x: 0,
        y: 0
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


    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    requestAnimationFrame(() => {this.update()});
  }

  update = () => {
    const { context, screen } = this.state;
    // const keys = this.state.keys;

    context.save();
    context.clearRect(0, 0, screen.width, screen.height);

    // console.log(screen.coefficient);
    context.beginPath();
    context.arc( 500, 300, 100, 0, 2 * Math.PI);
    context.fill();
    // context.stroke();


    context.restore();

    // Next frame
    requestAnimationFrame(() => {this.update()});
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
    const {
      screen,
      mouseCoordinates
    } = this.state;

    return (
      <div className='canvas-container'>
        <div className='exitButton' onClick={this.handleBack} />
        <canvas ref="canvas"
          width={parseInt(640*screen.width/screen.height)}
          height={640}
          style={{'width': '100%', 'height': screen.height}}
        />
        <div className='canvas-container_mouse-coordinates'>
          <div>x: {mouseCoordinates.x}</div>
          <div>y: {mouseCoordinates.y}</div>
        </div>
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
