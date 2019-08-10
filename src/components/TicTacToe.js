import React, { Component } from 'react'
import Board from './Tictactoe/Board';
import socketIOClient from 'socket.io-client';

export default class TicTacToe extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001"
        }
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('NewPlayer')

    }
    render() {
        return (
            <div className="TicTacToe">
                <div className="game-board">
                    Test
                    <Board />
                </div>
            </div>
        )
    }
}
