import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.css'


import   './assets/styles/global.scss'
import todoApp from './pages/todoApp.js'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={todoApp} path="/" ></Route>
          {/* <Route  path={"/:id"} component={TodoEdit} exact ></Route> */}

          {/* <Route component={TodoEdit} path="/TodoEdit/:id" exact></Route> */}


        </Switch>
      </Router>

    </div>
  )
}



export default App

