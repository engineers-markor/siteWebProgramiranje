import React from 'react';
import './video.css';

export const Video = ({src, title}) => (
    <div className="video">
        <h2 className="videoTitle">{title}</h2>
        <iframe title="video" className="videoBox " width="350" height="196" src={src} frameBorder="0" allow=" encrypted-media"/>
    </div>
);