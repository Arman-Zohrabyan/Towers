import React, { Component, Fragment } from 'react';
import scripts from '../utility/canvas-scripts';


class JoinPage extends Component {
    constructor() {
        super();

        this.state = {
            nickname: '',
            isNicknameCorrect: false
        };
    }

    // componentDidMount() {
    //     this.setState({isReady: true});
    // }

    onSubmitHandle = (e) => {
        e.preventDefault();
        console.log('submited');
    }

    onChangeHandle = (e) => {
        const { name, value } = e.target;
        const isNicknameCorrect = (value.trim().length > 2);
        this.setState({
            isNicknameCorrect,
            [name]: value
        })
    }

    setDangerousHtml(html, el) {
        if (el === null) return;
        const range = document.createRange();
        range.selectNodeContents(el);
        range.deleteContents();
        el.appendChild(range.createContextualFragment(html));
    }

    render() {
        // const readyClass = this.state.isReady ? " preloader__hide" : '';

        return(
            <Fragment>
                {/*<div className={'preloader' + readyClass}>
                    <div className="preloader__container">
                        <div className="preloader__circle-container">
                            <div className="preloader__circle preloader__circle--four"></div>
                            <div className="preloader__circle preloader__circle--three"></div>
                            <div className="preloader__circle preloader__circle--two"></div>
                            <div className="preloader__circle preloader__circle--one"></div>
                        </div>
                    </div>
                </div>*/}


                <div className="video-container">
                    <video autoPlay loop src="/video/background.mp4" className="video-container__video"></video>
                </div>
                <div className="start-container">
                </div>

                <div className="joinContent">
                        <div className="on2 joinContent__siteTitle">
                            <div className="marker1"></div>
                            <div>T</div>
                            <div className="letter-o">O</div>
                            <div className="letter-w">W</div>
                            <div className="letter-e">E</div>
                            <div className="letter-r">R</div>
                            <div>S</div>
                            <div className="marker2"></div>
                        </div>
                    <div className="joinContent-container">
                        <input
                            type="text"
                            id='canvas-input'
                            placeholder="Write Your Nickname"
                            name='nickname'
                        />
                        <button
                            id="canvas-button"
                            onClick={this.onSubmitHandle}
                        >
                            Continue
                        </button>
                    </div>
                </div>

                <div ref={this.setDangerousHtml.bind(null, scripts.canvasButton + scripts.canvasInput)} />
            </Fragment>
        );
    }
}


export default JoinPage;
