import React, { PureComponent } from 'react'
import './Overlay.scss'

export default class Overlay extends PureComponent {
    bodyClassList = null;
    componentDidMount() {
        this.bodyClassList = document.getElementsByTagName("body")[0].classList;
        this.bodyClassList.add("no-scroll");
    }
    componentWillUnmount() {
        this.bodyClassList.remove("no-scroll");
    }
    render() {
        const { show } = this.props;
        return show && (
            <div onClick={this.props.onClick} className="overlay">

            </div>
        )
    }
}
