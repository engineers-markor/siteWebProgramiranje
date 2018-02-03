import React, {Component} from 'react';
import {getCourses} from '../../base';
import ItemCourse from '../common/ItemCourse';
import './courseList.css';

export default class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: []
        }
    }

    componentDidMount() {
        getCourses.then(courses => {
            this.setState({courseList: courses})
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const coursesIds = Object.keys(this.state.courseList);
        return (
            <div className="flexCourses">
                <h1>Courses</h1>
                <div className="courseList">
                    {coursesIds.map(id => {
                        return <ItemCourse
                            key={id}
                            logo={this.state.courseList[id].logo}
                            name={this.state.courseList[id].name}
                            to={`/courses/${id}`}/>
                    })}
                </div>
            </div>
        )
    }
}
