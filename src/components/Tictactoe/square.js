import React, { Component } from 'react'

export default class square extends Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}
