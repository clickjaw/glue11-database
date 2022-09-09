import {React, Component} from 'react';
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import Main from "./components/Main";
import About from "./components/About"
import AllToDo from "./components/AllToDo"

export default class App extends Component {

  render() {
    return (
      <Router>
        <nav>
          <ul>
          <li>
            <Link to = "/">Main</Link>
          </li>
          <li>
            <Link to = "/toDo">To Do</Link>
          </li>
          <li>
            <Link to = "/about">About</Link>
          </li>
          </ul>
          </nav>
      <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path = '/about' element = {<About/>}/>
        <Route exact path = "/toDo" element={<AllToDo/>}/>
      </Routes>
    </Router>
    )
  }
}
