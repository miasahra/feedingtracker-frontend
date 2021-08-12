export default async function logoutUser() {
  localStorage.removeItem("token")
}
