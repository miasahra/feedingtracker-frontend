import axios from "axios"
import apiRoutes from "./routes"

export default async function createFeed(token, feed) {
  const headers = { Authorization: token }
  return axios.post(apiRoutes.feeds.NewFeed, JSON.stringify(feed), { headers })
    .then(res => res.data)
    .catch(err => err)
}
