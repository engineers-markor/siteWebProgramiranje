import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import {loadYoutube} from '../../base';
import {List} from '../common/list/List';
import {Video} from '../common/video/Video';
import img1 from '../../img/background1.jpg';
import img2 from '../../img/background2.jpg';
import img3 from '../../img/background3.jpeg';

const images = [img1, img2, img3, img2];

const listFrameworks = {
    elements: [{
        href: "https://vuejs.org/",
        value: "Vue.js",
        src: "https://firebasestorage.googleapis.com/v0/b/javascriptlesson-49720.appspot.com/o/home%2Fframework%2Fvue.png?alt=media&token=f8f060ea-49fe-42cf-971d-4e21c346770a",
        alt: "vue_js_logo"
    }, {
        href: "https://angular.io/",
        value: "Angular",
        src: "https://firebasestorage.googleapis.com/v0/b/javascriptlesson-49720.appspot.com/o/home%2Fframework%2Fangular.png?alt=media&token=20c8cd30-70c2-4fc7-88a8-cd0db1de963d",
        alt: "angular_logo"
    }, {
        alt: "react_logo",
        href: "https://reactjs.org/",
        value: "React",
        src: "https://firebasestorage.googleapis.com/v0/b/javascriptlesson-49720.appspot.com/o/home%2Fframework%2Freact.png?alt=media&token=c2892ee4-cb56-4455-8c25-633f03f41fdc"
    }],
    title: "Frameworks"
};


export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            showImg: [true, false, false, false],
            images,
            youtube: {title: "", src: ""}
        }

    }

    setVisibility(state) {
        if (state) {
            const index = state.indexOf(true);
            if (index === state.length - 1) {
                return [true, ...state.slice(1, index), false];
            } else {
                state[index] = false;
                state[index + 1] = true;
                return [...state.slice(0, index), false, true, ...state.slice(index + 2)];
            }
        }
    }

    componentWillMount() {
        loadYoutube().then(youtube => {
            this.setState({youtube})
        })
    }

    componentDidMount() {

        this.interval = setInterval(() => {
            this.setState((prevState) => ({
                showImg: this.setVisibility(prevState.showImg)
            }));
        }, 4000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="home">
                {this.state.images.map((img, index) => {
                    return (
                        <div key={index}
                             className={this.state.showImg[index] ? 'home-main-img show' : 'home-main-img hide'}>
                            <img src={img} alt=''/>
                        </div>
                    )
                })}

                <div className="home-main-content">
                    <h3>Learn code</h3>
                    <h1>Postanite JavaScript Nindza </h1>
                    <Link to="/courses">
                        LEARN CODE NOW
                    </Link>
                </div>

                <section className="leftBar ">

                    <article className="leftBar-item">
                        <List {...listFrameworks} />
                    </article>

                    <article className="leftBar-item ">
                        <Video {...this.state.youtube} />
                    </article>

                </section>
                <div className="bottomBar">

                </div>

            </div>
        )
    }
}
