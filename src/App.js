import React from "react"
import './scss/bootstrap.css'

// import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Game from './components/Game'

import './scss/App.css'

function App() {
    return (
        // <Router>
        //     <div className="nav">
        //         <Link to="/">Home</Link>
        //         <Link to="/Pong">Ping Pong</Link>
        //     </div>
        //     <div className="App">
        //         <Route exact path="/" component={Homepage}/>
        //         <Route path="/Pong" component={Pong}/>
        //     </div>
        // </Router>
        <Game />

    );
}

export default App;