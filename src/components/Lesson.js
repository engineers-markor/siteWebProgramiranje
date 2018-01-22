import React, {Component} from 'react'

export default class Lesson extends Component {
    render() {
        const lesson = this.props.lesson;
        console.log(lesson);
        return (
            <div>
                <h1>
                    {lesson.title}
                </h1>

                <h3>
                    Zahtevi za ovu verziju:
                </h3>
                <ol>
                    {lesson.requirements.map((req, key) => (
                        <li key={key}>{req}</li>
                    ))}
                </ol>

                <h3>
                    Realizacija zahteva:
                </h3>

            </div>
        )
    }
}
