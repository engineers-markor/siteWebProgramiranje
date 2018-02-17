import React, {Component} from 'react';
import {getCoursesLessons, getAllUserCourses, addCourseToUser} from '../../base';
import './Lessons.css';
import {Link, Route} from "react-router-dom";
import Lesson from "../lesson/Lesson";
import {getLessonIdFromPathName} from "../../util/util";

export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        };
        this.courseId = this.props.match.params.courseId;
    }

    componentDidMount() {

        getAllUserCourses().then(courses => {
            if (courses[this.courseId]) {
                // console.log("already have course");
                this.setState({
                    lessons: courses[this.courseId].listLessons
                })
            } else {
                // console.log("first time listen course");
                getCoursesLessons(this.courseId).then(lessons => {
                    addCourseToUser(this.courseId, lessons);
                    this.setState({
                        lessons
                    });
                });
            }
        });
    }

    render() {
        const course = this.state.lessons;
        const locationLessonId = getLessonIdFromPathName(this.props.location.pathname);
        return (
            <div className="lessonWrapper">
                <div className="lessonsList">
                    {course ? course.map(lesson => {
                        return <Link className={lesson.id === locationLessonId ? "active" : "notActive"}
                                     key={lesson.id}
                                     to={`/course/${this.courseId}/${lesson.id}`}
                        >{lesson.name}</Link>
                    }) : null}
                </div>
                <div className="lessonBody">
                    <Route path={`/course/${this.courseId}/:lessonId`} component={Lesson}/>
                    <Route exact path={`/course/${this.courseId}`} render={() => (<h3>Chose lesson</h3>)}/>
                </div>
            </div>
        )
    }
}
