import React, {Component} from 'react'
import {getLessonById} from '../../base';
import './lesson.css';
import TextElement from '../elements/TextElement';
import {getLessonIdFromPathName} from '../../util/util';


export default class Lesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: {},
            lessonId: ''
        }
    }

    componentWillMount() {
        getLessonById(this.props.match.params.lessonId).then(lesson => {
            this.setState({
                lesson
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.lessonId !== this.props.match.params.lessonId) {
            const lessonId = getLessonIdFromPathName(nextProps.match.params.lessonId);
            getLessonById(lessonId).then(lesson => {
                this.setState({
                    lesson,
                    lessonId
                })
            })
        }
    }

    render() {
        const {lesson} = this.state;
        return (
            <div>
                <h2>{lesson.name}</h2>
                {lesson.el1 && <TextElement title={lesson.el1.title} value={lesson.el1.value}/>}
            </div>
        )
    }
}
