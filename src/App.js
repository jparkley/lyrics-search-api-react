import React from "react"
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Index from "./components/layout/Index"
import Lyrics from "./components/tracks/Lyrics"
import "./App.css"

import { Provider } from "./context"

function App() {
  return (
    <Provider>
      <HashRouter basename="/">
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </>
      </HashRouter>
    </Provider>
  )
}

export default App
