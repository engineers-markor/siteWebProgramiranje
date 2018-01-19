import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import {app, base} from './base';
import Home from './components/Home';
import Courses from './components/Courses';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Lessons from './components/Lessons';

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
        }
        this.setState({asideClass: asideClass, appClass: appClass})
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
                                    email: data.email
                                }
                            });
                        })
                        .catch(error => {});
                } else {
                    this.setState({auth: false});
                }
            })
    }

    componentWillUnmount() {
        base.removeBinding(this.messagesRef);
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
                            ? <button className="ui teal icon small button">
                                    <Link to="/login">
                                        <i aria-hidden="true" className="sign in icon"></i>
                                    </Link>
                                </button>
                            : <button className="ui teal icon small button">
                                <Link to="/logout">
                                    <i aria-hidden="true" className="sign out icon"></i>
                                </Link>
                            </button>
}
                    </div>
                </header>
                <main className="main" onClick={this.hideAside}>
                    <div className="content">
                        <Switch>
                            <Route path="/" exact render={() => (<Home navBarsHide={this.navBarsHide}/>)}/>
                            <Route
                                exact
                                path="/courses"
                                render={() => (<Courses navBarsHide={this.navBarsHide}/>)}/>
                            <Route path="/about" render={() => (<About navBarsHide={this.navBarsHide}/>)}/>
                            <Route
                                path="/login"
                                render={() => {
                                this.login = true;
                                return <Login navbarsHide={this.navBarsHide}/>;
                            }}/>
                            <Route
                                path="/logout"
                                render={() => (<Logout navbarsHide={this.navBarsHide}/>)}/>
                            <Route
                                path="/courses/:id"
                                children={(props) => {
                                return <Lessons id={props.match.params.id} auth={this.state.auth}/>;
                            }}/>
                        </Switch>
                    </div>
                </main>
                <footer className="footer">
                    <p>Learn Code</p>
                </footer>
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

export default App;
