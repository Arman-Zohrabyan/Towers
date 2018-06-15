/**
 * Layout Component.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import toggleScreen from '../utility/toggleScreen';
import Loading from './Loading.jsx';


class Layout extends React.Component {
    constructor() {
        super();

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
