import React from 'react';
import {Link} from 'react-router-dom';

const ItemCourse = ({to, name, logo}) => (
    <Link to={to}>
        <div
            style={{
            width: `100%`,
            margin: `20px 0`,
            height: `100px`,
            background: `aqua`
        }}>
            <h1>{name}</h1>
            <img src={logo}/>
        </div>
    </Link>
);

export default ItemCourse;
