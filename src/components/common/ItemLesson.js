import React from 'react';
import {Link} from 'react-router-dom';

const ItemLesson = ({to, name,}) => (
    <Link className="courseItem" to={to}>
        <div>
            <h1>{name}</h1>
        </div>
    </Link>
);

export default ItemLesson;