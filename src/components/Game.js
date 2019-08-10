import React, { Component } from "react"
import Pong from './Pong'
import axios from 'axios'

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

const MMAPIUrl = 'http://rps-462.herokuapp.com/games'
const SDAPIUrl = 'SDAPI'
const DEVSERVER = 'http://127.0.0.1:4001'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            server: false,
            username: "",
            uid: uuidv4(),
            showAlert: false
        };
    }

    handleSubmit = event => {
        event.preventDefault()

        const user = {
            name: this.state.username
        }

        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        axios.put(MMAPIUrl, {user})
            .then(res => {
                    // axios.get(SDAPIUrl, {timeout: 180000})
                    //     .then(sdres => {

                    //     })
                    this.setState({server: DEVSERVER})
            })
            .catch(err => {
                this.setState({showAlert: true})
            })
    }

    // Client:
    // http.put(MMAPIUrl, {user}).then(res => {
    //     if (res.status == 200) {
    //         http.get(ServDetAPIURL, {user}).then(res => {
    //             if (res.status == 200) {
    //                 this.setState({server: res.data.server})
    //             }
    //         })
    //     }
    // })
    
    handleChange = event => {
        this.setState({username: event.target.value})
    }

    handleEndGame = event => {
        this.setState({server:false})
    }

    render() {
        const { server, username, uid, handleEndGame, showAlert } = this.state
        if (server) {
            return (
                <div className="container">
                    <div className="row">
                        <Pong uid={uid} playername={username} endpoint={server} gameover={this.handleEndGame}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                {(showAlert) ? <div class="alert alert-danger alert-dismissable" role="alert">
                    "There was a problem connecting to the server :("
                </div> : ""}
                    <div className="row">
                        <div className="form_bg">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="playername">Playername</label><br />
                                    <input type="text" placeholder="Enter a playername" onChange={this.handleChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Let's Play!</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

    }
}
