export default function getUsername() {
  const tokenString = localStorage.getItem("token")
  const userToken = JSON.parse(tokenString)
  return userToken?.username
}