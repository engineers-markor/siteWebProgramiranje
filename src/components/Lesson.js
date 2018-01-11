import React, {Component} from 'react'

export default class Lesson extends Component {
    componentWillMount() {
        if (this.props.sideNav === 'sideNavShow') {
            this
                .props
                .navBarsHide();
        }
    }

    render() {
        return (
            <div>
                <h1>Lesson</h1>
            </div>
        )
    }
}
