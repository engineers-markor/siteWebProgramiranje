import React, {Component} from 'react'

export default class About extends Component {

    componentWillMount() {
        this
            .props
            .navBarsHide();
    }

    render() {
        return (
            <div>
                <h1>About</h1>
            </div>
        )
    }
}
