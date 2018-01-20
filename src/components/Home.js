import React, {Component} from 'react'
import './home.css';
import img1 from '../img/background1.jpg';
import img2 from '../img/background2.jpg';
import img3 from '../img/background3.jpeg';

const images = [img1, img2, img3, img2];

export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            showImg: [true, false, false, false],
            images
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
                {/*<div className={this.state.showImg[0] ? 'home-main-img show' : 'home-main-img hide'}>*/}
                {/*<img src={img2} alt=''/>*/}
                {/*</div>*/}
                {/*<div className={this.state.showImg[1] ? 'home-main-img show' : 'home-main-img hide'}>*/}
                {/*<img src={img1} alt=''/>*/}
                {/*</div>*/}
                <div className="home-main-content">
                    <h1>title</h1>
                </div>


                <div className="leftBar">

                </div>
                <div className="bottomBar">

                </div>

            </div>
        )
    }
}
