import "../css/tailwind.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import React from "react"
import useToken from "../assets/utils/useToken"
import Routes from "../assets/utils/routes"
import Login from "./Login"
import Register from "./Register"
import Dashboard from "./Dashboard"
import History from "./History"
import AuthedRoute from "./AuthedRoute"
import Account from "./Account"

function App() {
  const { token, setToken } = useToken()

  return (
    <Router>
      <Route
        path="/"
        render={() => (
          token ?
            <Redirect to={Routes.Dashboard} /> :
            <Redirect to={Routes.Login} />
        )}
      />
      <Route path={Routes.Login}>
        <Login setToken={setToken} />
      </Route>
      <Route path={Routes.Register}>
        <Register setToken={setToken} />
      </Route>
      <AuthedRoute component={Dashboard} path={Routes.Dashboard} token={token} />
      <AuthedRoute component={History} path={Routes.History} token={token} />
      <AuthedRoute component={Account} path={Routes.Account} token={token} />
    </Router>
  )
}

export default App
