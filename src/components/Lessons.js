import React, {Component} from 'react';
import {getCoursesLessons} from '../base';
import Loading from './Loading';
import {Link, Route} from 'react-router-dom';
import Lesson from './Lesson';
import {overview} from '../CourseJS';
import './Lessons.css';


export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            loading: true,
            lessons: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        getCoursesLessons(this.props.courseId).then(data => {
            this.setState({
                course: data,
                loading: false,
                lessons: Object.keys(data.lessons)
            });
        }).catch(error => {
            this.setState({loading: false});
        });
    }

    createTitle() {
        return {__html: overview.title};
    }

    createContent() {
        return {__html: overview.description};
    }

    render() {
        console.log(this.state);
        if (this.state.loading) {
            return <Loading/>
        }

        if (!this.props.auth) {
            return (
                <div>
                    <h1>Molim vas kako biste poceli kurs prvo se besplatno ulogujte.</h1>
                    <Link to="/login">Login</Link>
                </div>
            );
        }

        return (
            <div className="flexLesson">


            </div>
        )
    }
}
