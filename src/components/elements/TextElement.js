import React from 'react';

const TextElement = ({title, value}) => (
    <div>
        {title && <h3>{title}</h3>}
        {value && <p>{value}</p>}
    </div>
);

export default TextElement;