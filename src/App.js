import React from "react"

import './scss/bootstrap.css'

import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Homepage from "./components/Homepage"
import Pong from './components/Pong'
import TicTacToe from './components/TicTacToe'
import './scss/TicTacToe.css'



function App() {
  return (
      <Router>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/Tictactoe">TicTacToe</Link>
          <Link to="/Pong">Ping Pong</Link>
        </div>
        <div className="App">
          <Route exact path="/" component={Homepage}/>
          <Route path="/Tictactoe" component={TicTacToe}/>
          <Route path="/Pong" component={Pong}/>
        </div>
      </Router>
    );
}

export default App;