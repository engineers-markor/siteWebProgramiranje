import React, {Component} from 'react'
import {getLessonById} from '../../base';
import './lesson.css';
import TextElement from '../elements/TextElement';
import {getLessonIdFromPathName, objectToArray} from '../../util/util';


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
        const lesson = objectToArray(this.state.lesson);
        return (
            <div>
                <h2>{lesson.name}</h2>
                <div className="lesson">
                    {lesson.map((element, key) => {
                        switch (element.type) {
                            case "title":
                                return <h2 style={{textAlign: `center`, paddingTop: `5px`}}
                                           key={key}>{element.value}</h2>;
                            case "text":
                                return <TextElement key={key} title={element.title} value={element.value}/>;
                            case "link":
                                return <a key={key} href={element.href} target='blank'>{element.value}</a>;
                            case "image":
                                return <img key={key} style={{
                                    margin: `0px auto`,
                                    width: `70%`,
                                    paddingTop: `5px`
                                }}
                                            src={element.src}
                                            alt={element.alt}/>;
                            case "list":
                                return (
                                    <ol key={key}>
                                        {element.list.map((ul, k) => <li key={k}>{ul}</li>)}
                                    </ol>);
                            default :
                                return null;
                        }
                    })}
                </div>
            </div>
        )
    }
}
