import React, {Component} from 'react';
import {getCoursesLessons, getAllUserCourses, addCourseToUser, getLessonById} from '../../base';
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
                this.setState({
                    lessons: courses[this.courseId].listLessons
                })
            } else {
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
                            return (<div className="lesson">
                                {elements.map((element, key) => {
                                    switch (element.type) {
                                        case "title":
                                            return <h2 style={{textAlign: `center`, paddingTop: `5px`}}
                                                       key={key}>{element.value}</h2>;
                                        case "text":
                                            return <TextElement key={key} title={element.title} value={element.value}/>;
                                        case "link":
                                            return <a key={key} href={element.href} target='blank'>{element.value}</a>;
                                        default :
                                            return null;
                                    }
                                })}
                                {course && course[0] &&
                                <Link className="btnNext" to={`/course/${this.courseId}/${course[0].id}`}>Zapocnite
                                    Kurs</Link>}
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
