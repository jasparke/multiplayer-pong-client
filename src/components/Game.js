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
const SDAPIUrl = 'https://csc462-mmaas.herokuapp.com/server/'
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
            name: this.state.uid
        }

        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        let retries = 0
        axios.put(MMAPIUrl, {user})
            .then(res => {
                let loop = setInterval(() => {
                    axios.get(SDAPIUrl+this.state.uid)
                        .then((response) => {
                            console.log(response)
                            if (response == null)
                            this.setState({server: response.serverInfo})
                            clearInterval(loop)
                        }).catch((error) => {
                            console.log("Didn't find it.", ++retries)
                            console.log(error.response)
                            if (retries > 3) {
                                console.log('forcing devserver after', retries)
                                this.setState({server: DEVSERVER})
                                clearInterval(loop)
                            }
                        })
                }, 5000)
            })
            .catch(err => {
                this.setState({showAlert: true})
            })
    }
    
    handleChange = event => {
        this.setState({username: event.target.value})
    }

    handleEndGame = event => {
        this.setState({server:false})
    }

    render() {
        const { server, username, uid, showAlert } = this.state
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
                {(showAlert) ? <div className="alert alert-danger alert-dismissable" role="alert">
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
