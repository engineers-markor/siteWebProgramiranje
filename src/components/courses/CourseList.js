import React, {Component} from 'react';
import {getCourses} from '../../base';
import ItemCourse from '../ItemCourse';

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
                {coursesIds.map(id => {
                    const to = "/courses/" + id;
                    return <ItemCourse
                        key={id}
                        logo={this.state.courseList[id].logo}
                        name={this.state.courseList[id].name}
                        to={to}/>
                })}
            </div>
        )
    }
}
