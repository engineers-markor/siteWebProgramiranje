import React, {Component} from 'react';
import {getCoursesLessons, getUserCourses, addCourseToUser} from '../base';
import Loading from './Loading';
import {Link} from 'react-router-dom';
import Lesson from './Lesson';
import {overview} from '../CourseJS';
import './Lessons.css';


export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            loading: false,
            lessons: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        // if (this.props.user.uid) {
        //     getUserCourses(this.props.user.uid).then(userCourses => {
        //         console.log(userCourses);
        //         if (userCourses[this.props.courseId]) {
        //
        //         } else {
        //             addCourseToUser(this.props.user.uid, this.props.courseId);
        //         }
        //     });
        //     getCoursesLessons(this.props.courseId).then(data => {
        //         this.setState({
        //             course: data,
        //             loading: false,
        //             lessons: Object.keys(data.lessons)
        //         });
        //     }).catch(error => {
        //         this.setState({loading: false});
        //     });
        // }
    }

    createTitle() {
        return {__html: overview.title};
    }

    createContent() {
        return {__html: overview.description};
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        }

        return (
            <div className="flexLesson">


            </div>
        )
    }
}
