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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export default class Pong extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: uuidv4(),
            data: false,
            left: false,
            right: false,
            score: 0,
            endpoint: "http://127.0.0.1:4001"
        }
        this.player = {
            id: this.state.id,
            left: false,
            right: false
        }
        this.socket = socketIOClient(this.state.endpoint)
    }
    
    componentDidMount() {
        const { socket } = this
        socket.emit('PlayerReady', this.player.id)

        socket.on("Update", data => {
            this.setState({data})
            this.updateCanvas();
        })

        window.addEventListener('keydown', this.keyHandlerDown)
        window.addEventListener('keyup', this.keyHandlerUp)

        setInterval(() => {
            socket.emit('PlayerMove', this.player);
        }, 1000/60);
    }

    componentWillUnmount() {
        this.socket.close()
    }
    keyHandlerDown = (e) => {
        if (e.keyCode === 65) {
            this.player.left = true
        } else if (e.keyCode === 68) {
            this.player.right = true
        }
    }
    keyHandlerUp = (e) => {
        if (e.keyCode === 65) {
            this.player.left = false
        } else if (e.keyCode === 68) {
            this.player.right = false
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
        const { data, id } = this.state
        return (
            <div>
              <div id="status">{data && (data.p1 == id || data.p2 == id) ? 'You are ' + data.players[id].name : 'Waiting to Connect...'}</div>
              <canvas ref="canvas" width={this.props.width} height={this.props.height} />
            </div>
        )
    }
}

Pong.defaultProps = {
    height: 500,
    width: 400,
};
