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
import { handleResize } from './events/resizeEvent';
import { onEnterCameraTriangle, onLeaveCameraTriangle } from './helpers/camera.js';


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


    handleResize.call(this);
    window.addEventListener('resize',  handleResize.bind(this));
    window.addEventListener('keydown',  keyDown.bind(this));
    window.addEventListener('keyup',  keyUp.bind(this));


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
    context.arc( 100 - camera, 300, 100, 0, 2 * Math.PI);
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

    window.removeEventListener('resize', handleResize);
    window.addEventListener('keydown',  keyDown);
    window.addEventListener('keyup',  keyUp);
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
        <div className='canvas-container__triangle-left'
          onMouseEnter={onEnterCameraTriangle.bind(this, 'LEFT')}
          onMouseLeave={onLeaveCameraTriangle.bind(this)}
          onTouchStart={onEnterCameraTriangle.bind(this, 'LEFT')}
          onTouchEnd={onLeaveCameraTriangle.bind(this)}
        />
        <div className='canvas-container__triangle-right'
          onMouseEnter={onEnterCameraTriangle.bind(this, 'RIGHT')}
          onMouseLeave={onLeaveCameraTriangle.bind(this)}
          onTouchStart={onEnterCameraTriangle.bind(this, 'RIGHT')}
          onTouchEnd={onLeaveCameraTriangle.bind(this)}
        />
        <div className='canvas-container_mouse-coordinates'>
          <div>camera: {camera}</div>
          <div>speed: {cameraSpeed}</div>
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
