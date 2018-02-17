import React, {Component} from 'react';
import './App.css';
import {Link, Route, Redirect} from 'react-router-dom';
import {app, base, authListener, getIsAuth} from './base';
import Home from './components/home/Home';
import Courses from './components/courses/CourseList';
import About from './components/about/About';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Lessons from './components/lessons/Lessons';
import Footer from './components/common/Footer';
import Loading from "./components/common/loading/Loading";

class App extends Component {

    constructor() {
        super();

        this.state = {
            asideClass: ['aside'],
            appClass: ['app'],
            user: null,
            auth: false,
            coursePath: '',
            loading: false,
        };

        this.hideAside = this
            .hideAside
            .bind(this);
        this.toggleAside = this
            .toggleAside
            .bind(this);

    }

    hideAside() {
        const asideClass = this.state.asideClass;
        const appClass = this.state.appClass;
        if (asideClass.length > 1) {
            asideClass.splice(1, 1);
            appClass.splice(1, 1);
            this.setState({asideClass: asideClass, appClass: appClass})
        }
    }

    toggleAside() {
        const asideClass = this.state.asideClass;
        const appClass = this.state.appClass;
        if (asideClass.length > 1) {
            asideClass.splice(1, 1);
            appClass.splice(1, 1);
        } else {
            asideClass.push('asideShow');
            appClass.push('appSlideOut');
        }
        this.setState({asideClass: asideClass, appClass: appClass})
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
        this.removeAuthListener = app
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    base
                        .fetch(`users/${user.uid}`, {context: this})
                        .then(data => {
                            this.setState({
                                auth: true,
                                user: {
                                    uid: user.uid,
                                    username: data.username,
                                    photoUrl: data.photoUrl,
                                    email: data.email,
                                    courses: data.courses,
                                },
                                loading: false,
                            });
                        })
                        .catch(error => {
                        });
                } else {
                    this.setState({auth: false, loading: false});
                }
            });

        authListener();

    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    render() {
        if (this.state.loading) return <Loading/>

        return (
            <div
                className={this
                    .state
                    .appClass
                    .join(' ')}>
                <header className="header">
                    <div className="showAside" onClick={this.toggleAside}>
                        <button className="ui teal small icon button">
                            <i aria-hidden="true" className="sidebar icon"></i>
                        </button>
                    </div>
                    <div className="title">
                        <Link to="/">
                            <h1>Learn Code</h1>
                        </Link>
                    </div>
                    <nav className="navLinks">
                        <Link className="navLink" to="/">Home</Link>
                        <Link className="navLink" to="/courses">Courses</Link>
                        <Link to="/about" className="navLink">About</Link>
                    </nav>
                    <div className="logout">
                        {!this.state.auth
                            ? <Link className='shadow' to="/login">
                                Log In
                            </Link>
                            : <Link to="/logout">
                                <button className="ui teal icon small button">
                                    <i aria-hidden="true" className="sign out icon"/>
                                </button>
                            </Link>
                        }
                    </div>
                </header>
                <main className="main" onClick={this.hideAside}>
                    <div className="content">
                        <Route path="/" exact render={() => {
                            return <Home user={this.state.user}/>;
                        }}/>
                        <Route exact path="/courses" component={Courses}/>
                        <Route path="/about" component={About}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <PrivateRoute path="/course/:courseId" component={Lessons}/>
                    </div>
                </main>
                <Footer cl="footer"/>

                <aside
                    className={this
                        .state
                        .asideClass
                        .join(' ')}
                    onClick={this.hideAside}>
                    <h5>LearnCode</h5>
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/about">About</Link>
                </aside>
            </div>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        getIsAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);


export default App;
