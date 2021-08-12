import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Routes from "../../assets/utils/routes"
import loginUser from "../../assets/utils/api/loginUser"
// eslint-disable-next-line import/extensions
import BabyBottle from "../../assets/img/baby-bottle.png"

export default function Login({ setToken }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    document.title = "Login - Feeding Tracker"
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await loginUser({
      email,
      password,
    })

    if (res.message) {
      setError("Authentication failed, please try again!")
    } else {
      setToken(res)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            alt="Bottleeslint"
            className="mx-auto h-20 w-auto"
            src={BabyBottle}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form action="#" className="mt-8 space-y-6" method="POST" onSubmit={handleSubmit}>
          <input defaultValue="true" name="remember" type="hidden" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only" htmlFor="email-address">
                Email address
              </label>
              <input
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                id="email-address"
                name="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                required
                type="email"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                id="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                type="password"
              />
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link className="font-medium text-blue-400 hover:text-blue-600" to={Routes.Register}>Register now</Link>
          </p>

          {error &&
            <p className="mt-2 text-center text-sm text-red-600">
              {error}
            </p>
          }

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = { setToken: PropTypes.func.isRequired }