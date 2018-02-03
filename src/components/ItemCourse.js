import React from 'react';
import {Link} from 'react-router-dom';

const ItemCourse = ({to, name}) => (
    <Link to={to}>
        <div
            style={{
                width: `100%`,
                margin: `20px 0`,
                height: `100px`,
                background: `aqua`
            }}>
            {name}
        </div>
    </Link>
);

export default ItemCourse;
