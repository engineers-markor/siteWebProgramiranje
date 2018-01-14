import React, {Component} from 'react';
import {getCoursesLessons} from '../base';
import Loading from './Loading';

export default class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: {},
            loading: true
        }
    }

    componentDidMount() {
        getCoursesLessons(this.props.id).then(data => {
            this.setState({lesson: data, loading: false});
        });
    }

    render() {

        if (this.state.loading) {
            return <Loading/>
        }

        return (
            <div>
                <h1>Lessons {this.state.lesson.name}</h1>
            </div>
        )
    }
}
