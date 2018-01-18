import React, {Component} from 'react'

export default class Lesson extends Component {
    render() {
        return (
            <div>
                <h1>
                     {this.props.courseId}<br/>
                     {this.props.lessonId}
                </h1>
            </div>
        )
    }
}
