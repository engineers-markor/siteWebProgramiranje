import React from 'react';
import {Link} from 'react-router-dom';
import '../courses/courseList.css';

const ItemCourse = ({to, name, logo}) => (
    <Link className="courseItem" to={to}>
        <img src={logo} style={{width: `150px`, height: `150px`, borderBottomLeftRadius:`10px`,borderTopLeftRadius:`10px`}} alt="logo"/>
        <div>
            <h1>{name}</h1>
        </div>
    </Link>
);

export default ItemCourse;
