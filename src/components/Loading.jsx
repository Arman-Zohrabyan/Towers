/**
 * Created By: Arman Zohrabyan
 */

import React from 'react';


export default class Loading extends React.Component {
    render() {
        return (
            <div className='preloader'>
                <div className='preloader__container'>
                    <div className='preloader__circle-container'>
                        <div className='preloader__circle preloader__circle--four' />
                        <div className='preloader__circle preloader__circle--three' />
                        <div className='preloader__circle preloader__circle--two' />
                        <div className='preloader__circle preloader__circle--one' />
                    </div>
                </div>
            </div>
        );
    }
}
