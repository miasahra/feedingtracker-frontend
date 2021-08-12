import axios from "axios"
import apiRoutes from "./routes"

export default async function getHistory(token) {
  return axios.get(apiRoutes.feeds.MyFeeds, { headers: { Authorization: token } })
    .then(res => res.data)
    .catch(err => err)
}
