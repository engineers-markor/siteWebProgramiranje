import React, {Component} from 'react';
import {getCoursesLessons, getUserCourses, addCourseToUser} from '../../base';
import '../Lessons.css';
import ItemLesson from '../common/ItemLesson';

export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        };
        this.courseId = this.props.match.params.id;
    }

    componentDidMount() {

        getUserCourses().then(courses => {
            if (courses[this.courseId]) {
                console.log("already have course");
                this.setState({
                    lessons: courses[this.courseId].listLessons
                })
            } else {
                console.log("first time listen course");
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
        const {lessons} = this.state;
        return (
            <div className="flexLesson">
                <h1>Lessons</h1>
                {lessons.map(lesson => {
                    return <ItemLesson key={lesson.id} to={`/courses/${this.courseId}/${lesson.id}`}
                                       name={lesson.name}/>
                })}
            </div>
        )
    }
}
