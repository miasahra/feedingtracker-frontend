import axios from "axios"
import apiRoutes from "./routes"

export default async function getDependants(token) {
  return axios.get(apiRoutes.dependants.MyDependants, { headers: { Authorization: token } })
    .then(res => res.data)
    .catch(err => err)
}
