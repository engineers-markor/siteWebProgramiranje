import React, {Component} from 'react'
import {getLessonById} from '../../base';
import './lesson.css';
import TextElement from '../elements/TextElement';
import {getLessonIdFromPathName, objectToArray} from '../../util/util';
import {Visibility} from 'semantic-ui-react';


export default class Lesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: {},
            lessonId: ''
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillMount() {
        document.addEventListener('scroll', this.handleScroll);
        getLessonById(this.props.match.params.lessonId).then(lesson => {
            this.setState({
                lesson
            })
        });
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.lessonId !== this.props.match.params.lessonId) {
            const lessonId = getLessonIdFromPathName(nextProps.match.params.lessonId);
            getLessonById(lessonId).then(lesson => {
                this.setState({
                    lesson,
                    lessonId,
                    btnTopVisible: false,
                })
            })
        }
    }

    handleScroll = () => {
        if (window.scrollY > 130) {
            this.setState({btnTopVisible: true});
        } else {
            this.setState({btnTopVisible: false});
        }
    };

    handleUpdate = (e, {calculations, children}) => {
        const key = children.key;
        if (calculations.onScreen) {
            this.refs[key].play();
        } else {
            this.refs[key].pause();
        }
    };

    goTop(e) {
        e.preventDefault();
        const animateToTop = () => {
            window.requestAnimationFrame(() => {

                if (window.scrollY === 0) {
                    return
                }
                window.scrollTo(0, window.pageYOffset - 80);
                animateToTop();
            });
        };
        animateToTop();
    }

    render() {
        console.log();
        const lesson = objectToArray(this.state.lesson);
        return (
            <div>
                <div className="lesson">
                    {lesson.map((element, key) => {
                        switch (element.type) {
                            case "title":
                                return (
                                    <div key={key} className="textCenter">
                                        <h2 key={key}
                                        >{element.value}</h2>
                                    </div>
                                );
                            case "text":
                                return (
                                    <TextElement key={key} title={element.title} value={element.value}/>
                                );
                            case "link":
                                return <a key={key} href={element.href} target='blank'>{element.value}</a>;
                            case "image":
                                return <img className="centerDiv "
                                            key={key} width="640px"
                                            src={element.src}
                                            alt={element.alt}/>;
                            case "list":
                                return (
                                    <div key={key}>
                                        <h3>{element.title}</h3>
                                        <ol>
                                            {element.list.map((ul, k) => <li key={k}>{ul}</li>)}
                                        </ol>
                                    </div>);
                            case "video":
                                return (
                                    <Visibility className="centerDiv" key={key} onUpdate={this.handleUpdate}>
                                        <video ref={key} width="640" height="480" key={key} loop>
                                            <source src={element.src} type="video/mp4"/>
                                        </video>
                                    </Visibility>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
                {this.state.btnTopVisible &&
                <button className="btnToTop" onClick={this.goTop}>
                    <i className="fa fa-arrow-up"/>
                </button>}
            </div>
        )
    }
}
