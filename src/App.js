import React, {Component} from 'react';
import './App.css';
import {Link, Route, Redirect} from 'react-router-dom';
import {app, base, userListener} from './base';
import Home from './components/home/Home';
import Courses from './components/courses/CourseList';
import About from './components/about/About';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Lessons from './components/Lessons';
import Footer from './components/common/Footer';

class App extends Component {

    constructor() {
        super();

        this.state = {
            asideClass: ['aside'],
            appClass: ['app'],
            user: {},
            auth: false,
            coursePath: ''
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
                                }
                            });
                        })
                        .catch(error => {
                        });
                } else {
                    this.setState({auth: false});
                }
            })
    }

    componentWillUnmount() {
        // base.removeBinding(this.messagesRef);
        this.removeAuthListener();
    }

    render() {
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
                            ? <Link to="/login">
                                <button className="ui teal icon small button">
                                    <i aria-hidden="true" className="sign in icon"></i>
                                </button>
                            </Link>
                            : <Link to="/logout">
                                <button className="ui teal icon small button">
                                    <i aria-hidden="true" className="sign out icon"></i>
                                </button>
                            </Link>
                        }
                    </div>
                </header>
                <main className="main" onClick={this.hideAside}>
                    <div className="content">
                        <Route path="/" exact component={Home}/>
                        <Route exact path="/courses" component={Courses}/>
                        <Route path="/about" component={About}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        {/*<Route*/}
                            {/*path="/courses/:id"*/}
                            {/*render={({match}) => (*/}
                                {/*<Lessons courseId={match.params.id} auth={this.state.auth} user={this.state.user}/>)}*/}
                        {/*/>*/}

                        <PrivateRoute path="/courses/:id" component={Lessons}/>
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
        app.auth().currentUser ? (
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
