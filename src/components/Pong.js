import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

function drawPlayer(ctx, player) {
    const { x, y, width, height, color } = player
    ctx.fillStyle = color
    ctx.fillRect(x,y,width, height)
}

function drawBall(ctx, ball) {
    const {x, y} = ball
    ctx.beginPath()
    ctx.arc(x,y,5,2*Math.PI, false)
    ctx.fillStyle = '#FFFFFF'
    ctx.fill();
}

export default class Pong extends Component {
    gameLoop = false;
    socket = false;

    constructor(props) {
        super(props)
        this.state = {
            data: false,
            left: false,
            right: false,
            score: 0,
        }

        this.socket = socketIOClient(this.props.endpoint)
    }
    
    componentDidMount() {
        const { socket } = this
        socket.emit('PlayerReady', {id: this.props.uid, name: this.props.playername})

        socket.on("Update", data => {
            this.setState({data})
            this.updateCanvas();
        })

        socket.on("GameOver", data => {
            this.props.gameover(data.winner)
            console.log(data.winner)
            clearInterval(this.gameLoop)
        })

        window.addEventListener('keydown', this.keyHandlerDown)
        window.addEventListener('keyup', this.keyHandlerUp)

        this.gameLoop = setInterval(() => {
            socket.emit('PlayerMove', {id: this.props.uid, left: this.state.left, right: this.state.right});
        }, 1000/60);
    }

    componentWillUnmount() {
        clearInterval(this.gameLoop)
        window.removeEventListener('keydown', this.keyHandlerDown)
        window.removeEventListener('keyup', this.keyHandlerUp)
        this.socket.close()
    }

    keyHandlerDown = (e) => {
        if (e.keyCode === 65) {
            this.setState({left: true})
        } else if (e.keyCode === 68) {
            this.setState({right: true})
        }
    }

    keyHandlerUp = (e) => {
        if (e.keyCode === 65) {
            this.setState({left: false})
        } else if (e.keyCode === 68) {
            this.setState({right: false})
        }
    }

    updateCanvas() {
        const { data } = this.state
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0,data.width,data.height)
        ctx.fillStyle = '#333333'
        ctx.fillRect(0,0,data.width,data.height)
        if (data.p1) drawPlayer(ctx, data.players[data.p1])
        if (data.p2) drawPlayer(ctx, data.players[data.p2])
        if (data.start) drawBall(ctx, data.ball)
    }

    render() {
        const { data } = this.state
        const id = this.props.uid
        return (
            <div>
              <div id="status">{data && (data.p1 === id || data.p2 === id) ? 'You are ' + data.players[id].name : 'Waiting to Connect...'}</div>
              <canvas ref="canvas" width={this.props.width} height={this.props.height} />
            </div>
        )
    }
}

Pong.defaultProps = {
    height: 500,
    width: 400,
};
