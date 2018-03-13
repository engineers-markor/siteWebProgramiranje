import React, {Component} from 'react'
import './about.css';

export default class About extends Component {

    render() {
        return (
            <div className="about">
                <h1>About</h1>
                <img alt="profilePhoto"
                     src="https://firebasestorage.googleapis.com/v0/b/javascriptlesson-49720.appspot.com/o/profile.png?alt=media&token=6f2285ee-eec9-45a5-ae14-8e68bfbe351f"
                     width="300px" height="300px"/>
                <div>
                    <h2>Marko Radojcic</h2>
                    <h5>FOUNDER & CEO </h5>
                    <p>Student <a rel="noopener noreferrer" href="http://www.ict.edu.rs/" target="_blank">Visoke
                        ICT </a>skole, programer u <a
                        href="https://engineers.london/"
                        target="_blank" rel="noopener noreferrer">Engineers</a> kao android developer, kontent menager
                        stranice <a rel="noopener noreferrer" target="_blank"
                                    href="https://www.instagram.com/colorful__nature/?hl=en">Colorful
                            Nature</a>, kao i
                        savetnik za internet marketing u CN Marketing-u. Sef kuhinje u rezidenciji Radojcic. Vecito u
                        potrazi za znanjem i nacinima da to znanje prenese na sto vise ljudi. Kontaktirajte nas <a
                            href="mailto:radojcicmarko1@gmail.com?Subject=Hello" target="_top">ovde</a>.
                    </p>
                </div>
            </div>
        )
    }
}
