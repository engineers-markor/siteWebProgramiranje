import React, {Component} from 'react'

export default class Home extends Component {

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
                <h1>Home</h1>
            </div>
        )
    }
}
