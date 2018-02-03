import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { app } from '../../base';

export default class LogOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    componentWillMount() {
        app.auth().signOut().then((user) => {
            this.setState({
                redirect: true,
            })
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
}