import React from "react"
import ReactDOM from "react-dom"
import "./css/tailwind.css"
import axios from "axios"
import App from "./components/App"

// Configure Axios Defaults
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
axios.defaults.headers.post["Content-Type"] = "application/json"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)