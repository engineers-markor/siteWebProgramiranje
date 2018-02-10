import React, {Component} from 'react';
import './loading.css';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}
