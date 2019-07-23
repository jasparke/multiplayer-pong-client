import React from "react"

import './scss/bootstrap.css'

import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Homepage from "./components/Homepage"
import Game2 from './components/Game2'
import TicTacToe from './components/TicTacToe';



function App() {
  return (
      <Router>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/Tictactoe">TicTacToe</Link>
          <Link to="/Game2">Game2</Link>
        </div>
        <div className="App">
          <Route exact path="/" component={Homepage}/>
          <Route path="/Game1" component={TicTacToe}/>
          <Route path="/Game2" component={Game2}/>
        </div>
      </Router>
    );
}

export default App;