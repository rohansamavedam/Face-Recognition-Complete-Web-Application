import React from 'react';

const ImageLinkForm = (props) => {
    return(
        <div>
            <p className='f3'>This App Detects Faces in your Pictures! Give it a try.</p>
            <div className='center'>
                <div className='pa4 br2 shadow-2 w-50 center baseBack'>
                    <input className='f4 pa2 w-70 center ma1' type='text' placeholder='image url here' onChange={props.onInputChange} />
                    <button className='grow w-30 f4 link pv2 dib white bg-light-green ma1 pointer' onClick={props.onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;