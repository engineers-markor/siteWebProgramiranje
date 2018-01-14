import React, {Component} from 'react';
import {getCoursesLessons} from '../base';
import Loading from './Loading';

export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            loading: true
        }
    }

    componentDidMount() {
        getCoursesLessons(this.props.id).then(data => {
            this.setState({course: data, loading: false});
        }).catch(error => {
            this.setState({loading: false});
        });
    }

    render() {

        if (this.state.loading) {
            return <Loading/>
        }

        if (!this.props.auth) {
            return <h1>Molim vas kako biste poceli kurs prvo se besplatno ulogujte.</h1>
        }

        console.log(this.state);
        return (
            <div>
                <h1>Course {this.state.course.name}</h1>
            </div>
        )
    }
}
