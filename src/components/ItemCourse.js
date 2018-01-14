import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ItemCourse extends Component {
  render() {
    return (
      <Link
        to={this.props.to}
        style={{
        marginTop: `20px`,
        marginBottom: `20px`
      }}>
        <div
          style={{
          width: `100%`,
          height: `100px`,
          background: `red`
        }}>
          {this.props.name}
        </div>
      </Link>
    )
  }
}
