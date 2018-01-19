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
        getCoursesLessons(this.props.id).then(data => {
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

    createContent(){
        return{__html: overview.description};
    }
    render() {

        if (this.state.loading) {
            return <Loading/>
        }

        if (!this.props.auth) {
            return <h1>Molim vas kako biste poceli kurs prvo se besplatno ulogujte.</h1>
        }

        return (
            <div className="flexLesson">
                <div className="contentLessons">
                    <Route
                        path="/courses/:courseId/:lessonId"
                        children={(props) => {
                        if (props.match) {
                            return <Lesson
                                courseId={props.match.params.courseId}
                                lessonId={props.match.params.lessonId}/>;
                        } else {
                            return (
                                <div className="lesson">
                                    <h1 dangerouslySetInnerHTML={this.createTitle()}/>
                                    <p dangerouslySetInnerHTML={this.createContent()}></p>
                                </div>
                            );
                        }
                    }}/>
                </div>
                <div className="navLessons">
                    <Link to={'/courses/' + this.props.id + "/"}>Overview</Link>
                    {this
                        .state
                        .lessons
                        .map((lesson) => {
                            return <Link key={lesson} to={'/courses/' + this.props.id + "/" + lesson}>{this.state.course.lessons[lesson].name}</Link>
                        })}
                </div>
            </div>
        )
    }
}
