import React from 'react';

import pdf from './../../doc.pdf';

export default function Footer({cl}) {
    return (
        <footer className={cl}>
            <a href={pdf} target="_blank"><p>Learn Code Dokumentacija</p></a>
        </footer>
    )
}