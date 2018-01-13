import React, {Component} from 'react'

export default class Home extends Component {

    componentWillMount() {
        this
            .props
            .navBarsHide();
    }

    render() {
        return (
            <div className="flexContainer" >
                <div className="mainContainer"></div>
                <div className="sideContainer"></div>
            </div>
        )
    }
}
