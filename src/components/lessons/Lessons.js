import React, {Component} from 'react';
import {getCoursesLessons, getAllUserCourses, addCourseToUser, getLessonById} from '../../base';
import './Lessons.css';
import {Link, Route} from "react-router-dom";
import Lesson from "../lesson/Lesson";
import {getLessonIdFromPathName, objectToArray} from "../../util/util";
import TextElement from "../elements/TextElement";

export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        };
        this.courseId = this.props.match.params.courseId;
    }

    componentDidMount() {

        getLessonById(this.courseId).then(overview => {

            this.setState({
                overview
            })
        });

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
                    <Route exact path={`/course/${this.courseId}`} render={() => {
                        if (this.state.overview) {
                            const {overview} = this.state;
                            const elements = objectToArray(overview);
                            console.log(elements);
                            return (<div style={{padding: `16px`}}>
                                {elements.map((element, key) => {
                                    switch (element.type) {
                                        case "title":
                                            return <h1 key={key}>{element.value}</h1>
                                        case "text":
                                            return <TextElement key={key} title={element.title} value={element.value}/>
                                    }
                                })}
                            </div>)
                        } else {
                            return <div>Loading...</div>
                        }

                    }}/>
                </div>
            </div>
        )
    }
}
