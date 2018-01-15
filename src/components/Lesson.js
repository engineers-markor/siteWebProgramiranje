import React, {Component} from 'react'

export default class Lesson extends Component {
    render() {
        return (
            <div>
                <h1>
                    Course {this.props.courseId}<br/>
                    Lesson {this.props.lessonId}
                </h1>
            </div>
        )
    }
}
