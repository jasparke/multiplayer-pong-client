import React, { Component } from "react"
import Pong from './Pong'
import axios from 'axios'

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

const APIUrl = 'http://rps-462.herokuapp.com/games'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            server: false,
            username: "",
            uid: uuidv4()
        };
    }

    handleSubmit = event => {
        event.preventDefault()

        const user = {
            name: this.state.username
        }

        axios.put(APIUrl, {user})
            .then(res => {
                //handle the responseeeeee
                console.log(res)
                console.log(res.data)
                
            })
    }
    
    handleChange = event => {
        this.setState({username: event.target.value})
    }

    render() {
        const { server, username, uid } = this.state
        if (server) {
            return (
                <div className="container">
                    <div className="row">
                        <Pong uid={uid} playername={username} endpoint={server} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="form_bg">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label for="playername">Playername</label><br />
                                    <input type="text" placeholder="Enter a playername" onChange={this.handleChange}/>
                                </div>
                                <button type="submit" class="btn btn-primary">Let's Play!</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

    }
}
