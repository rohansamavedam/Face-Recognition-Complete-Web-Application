import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png'
import './logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt shadow-2 br2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner"><img alt='logo' src={logo} style={{ height: 50, width: 50}}/></div>
            </Tilt>
        </div>
    )
}   

export default Logo;