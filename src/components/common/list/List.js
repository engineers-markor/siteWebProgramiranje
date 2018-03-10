import React from 'react';
import './list.css';


export const List = ({title, elements}) => (
    <div>
        <h2 className="title">{title}</h2>
        <ul className="list">
            {elements.map((element, key) => (
                <a key={key} href={element.href} target='blank'>
                    <li><img width="50px" height="50px" src={element.src} alt={element.alt}/><h4> {element.value}</h4></li>
                </a>
            ))}
        </ul>
    </div>

);

