import React, {Component} from 'react'
import {getUserCourseById, getLessonById} from '../../base';
import './lesson.css';
import {Link} from 'react-router-dom';

export default class Lesson extends Component {

    constructor() {
        super();
        this.state = {
            course: {},
            lesson: {},
        }

    }

    componentDidMount() {
        const {courseId, lessonId} = this.props.match.params;

        getUserCourseById(courseId).then(course => {
            this.setState({
                course
            })
        });
        getLessonById(lessonId).then(lesson => {
            this.setState({
                lesson
            })
        })
    }

    render() {
        const {course} = this.state;

        return (
            <div className="lessonWrapper">
                <div className="lessonsList">
                    {course.listLessons ? course.listLessons.map(lesson => {
                        return <Link className={lesson.id === this.props.match.params.lessonId ? "active" : "notActive"}
                                     key={lesson.id}
                                     to={`/courses/${this.props.match.params.courseId}/${lesson.id}`}
                        >{lesson.name}</Link>
                    }) : null}
                </div>


            </div>
        )
    }
}
