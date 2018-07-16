/**
 * Created By: Arman Zohrabyan
 *
 * Game page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initalState from './initalState';
import './GamePage.scss';
import Socket from '../../sockets';
import { keyDown, keyUp } from './events/keyEvents';


class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = initalState;
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
    window.addEventListener('keydown',  (e) => keyDown.call(this, e));
    window.addEventListener('keyup',  (e) => keyUp.call(this, e));


    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    requestAnimationFrame(() => {this.update()});
  }

  update = () => {
    const { context, canvas, camera } = this.state;
    // const keys = this.state.keys;

    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);

    // console.log(canvas.coefficient);
    context.beginPath();
    context.arc( 500 - camera, 300, 100, 0, 2 * Math.PI);
    context.fill();
    // context.stroke();


    context.restore();
// this.setState({ camera: camera+1 });
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
    const { clientWidth, clientHeight } = document.body;
    this.setState({
      screen : {
        width: clientWidth,
        height: clientHeight
      },
      canvas: {
        width: parseInt(640*clientWidth/clientHeight),
        height: 640
      }
    });
  }

  handleBack = () => {
    this.props.history.push('/boards');
  }

  render() {
    const {
      screen,
      canvas,
      camera,
      cameraSpeed
    } = this.state;

    return (
      <div className='canvas-container'>
        <div className='exitButton' onClick={this.handleBack} />
        <canvas ref="canvas"
          width={canvas.width}
          height={canvas.height}
          style={{'width': '100%', 'height': screen.height}}
        />
        <div className='canvas-container_mouse-coordinates'>
          <div>x: {camera}</div>
          <div>y: {cameraSpeed}</div>
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
