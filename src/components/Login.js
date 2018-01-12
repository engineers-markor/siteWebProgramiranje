import React, {Component} from 'react'
import {base, app} from '../base';
import {Redirect} from 'react-router-dom';
import './login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loginEmail: '',
            loginPassword: '',
            redirect: false,
            loading: false
        }
        this.createAccount = this
            .createAccount
            .bind(this);

        this.setUsername = this
            .setUsername
            .bind(this);

        this.setPassword = this
            .setPassword
            .bind(this);

        this.setEmail = this
            .setEmail
            .bind(this);

        this.setLoginEmail = this
            .setLoginEmail
            .bind(this);

        this.setLoginPassword = this
            .setLoginPassword
            .bind(this);

        this.login = this
            .login
            .bind(this);

        this.writeError = this
            .writeError
            .bind(this);
    }

    setUsername(e) {
        this.resetInput(e);
        this.setState({username: e.target.value})
    }

    setPassword(e) {
        this.resetInput(e);
        this.setState({password: e.target.value})
    }

    setEmail(e) {
        this.resetInput(e);
        this.setState({email: e.target.value})
    }

    setLoginEmail(e) {
        this.resetInput(e);
        this.setState({loginEmail: e.target.value})
    }
    setLoginPassword(e) {
        this.resetInput(e);
        this.setState({loginPassword: e.target.value})
    }

    login(e) {
        e.preventDefault();
        //log in
        if (this.state.loginPassword.length > 5) {
            app
                .auth()
                .signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
                .then((user) => {
                    this.setState({redirect: true});
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    createAccount(e) {
        e.preventDefault();
        if (this.validateEmail(this.state.email) && this.validatePassword(this.state.password)) {
            app
                .auth()
                .fetchProvidersForEmail(this.state.email)
                .then((providers) => {
                    if (providers.length === 0) {
                        //create account
                        return app
                            .auth()
                            .createUserWithEmailAndPassword(this.state.email, this.state.password);
                    } else if (providers.indexOf('password') === -1) {
                        console.log('Log in with facebook');
                    } else {
                        console.log('Already have account');
                    }
                })
                .then((user) => {
                    if (user) {
                        this.addUser(user.uid, user.email, this.state.username, user.photoURL
                            ? user.photoURL
                            : '');
                        this.setState({redirect: true});
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    addUser(uid, email, username, photoUrl) {
        base.post(`users/${uid}`, {
            data: {
                username: username,
                email: email,
                photoUrl: photoUrl
            }
        });
    }

    validateEmail(email) {
        const re = new RegExp("[0-9A-Za-z._]+@[0-9A-Za-z._]+\\.[0-9A-Za-z]+");
        return re.test(email);
    }

    validatePassword(password) {
        const reText = new RegExp("[a-zA-Z]*[0-9]+[a-zA-Z]*");
        const reNumb = new RegExp("[0-9]*[a-zA-Z]+[0-9]*");
        return reText.test(password) && reNumb.test(reNumb) && password.length > 5;
    }

    writeError(e) {
        let valide = false;
        switch (e.target.className) {
            case "email":
                valide = this.validateEmail(e.target.value);
                break;
            case "password":
                valide = this.validatePassword(e.target.value);
                break;
            default:
                break;
        }

        if (!valide && e.target.className.indexOf('error') === -1) {
            e.target.className += " error"
        }
    }

    resetInput(e) {
        e.target.className = e
            .target
            .className
            .split(' ')[0];
    }

    render() {
        if (this.state.redirect) {
            return <Redirect exact to="/"/>
        }

        return (
            <div className="form">
                <form onSubmit={this.createAccount} className="singup">
                    <h5>Create new Account</h5>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.setUsername}
                        placeholder="User Name"/>
                    <input
                        className="email nesto"
                        onBlur={this.writeError}
                        type="email"
                        value={this.state.email}
                        onChange={this.setEmail}
                        placeholder="Email"/>
                    <input
                        className="password"
                        onBlur={this.writeError}
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.setPassword}/>
                    <input className="button" type="submit" value="Create Account"/>
                </form>

                <form className="login" onSubmit={this.login}>
                    <h5>Log In</h5>
                    <input
                        className="email"
                        onBlur={this.validateEmail}
                        type="email"
                        value={this.state.loginEmail}
                        onChange={this.setLoginEmail}
                        placeholder="Email"/>
                    <input
                        className="password"
                        onBlur={this.validatePassword}
                        placeholder="Password"
                        type="password"
                        value={this.state.loginPassword}
                        onChange={this.setLoginPassword}/>
                    <input className="button" type="submit" value="Log In"/>
                </form>
            </div>
        );
    }
}
