import React, {Component} from 'react';
import {getCourses} from '../base';
import ItemCourse from './ItemCourse';

export default class Courses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentWillMount() {
        this
            .props
            .navBarsHide();

        getCourses.then(courses => {
            this.setState({courses: courses})
        }).catch(error =>{
            console.log(error);
        });
    }

    render() {
        const coursesIds = Object.keys(this.state.courses);
        return (
            <div className="flexCourses">
                <h1>Courses</h1>
                {coursesIds.map(id => {
                    const to = "/courses/" + id;
                    return <ItemCourse key={id} name={this.state.courses[id].name} to={to}/>
                })}
            </div>
        )
    }
}
