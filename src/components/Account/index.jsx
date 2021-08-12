import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import NavigationBar from "../NavigationBar"
import getDependants from "../../assets/utils/api/getDependants"
import createDependant from "../../assets/utils/api/createDependant"
import AddDependantModal from "./AddDependantModal"

function renderTable(dependants) {
  const sortedDependants = dependants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Created
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Logged Feeds
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedDependants.map((dependant) => {
                  const toDate = new Date(dependant.createdAt)
                  const readableDate = toDate.toLocaleDateString()

                  return (
                    <tr key={dependant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{readableDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dependant.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dependant.feeds?.length}</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Account({ token }) {
  const [dependants, setDependants] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    document.title = "Track a Feed - Feeding Tracker"

    const fetchData = async () => {
      const result = await getDependants(token)
      setDependants(result)
    }

    fetchData()
  }, [token])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const isFalsey = input => input == 0 || input == undefined || input == null || input == false || input == ""

  async function handleCreateDependant(e) {
    e.preventDefault()

    // Handle input validation
    if (isFalsey(name)) {
      return setError("You must provide a valid name!")
    }

    const res = await createDependant(token, { name })

    if (res.message) {
      setError(res.message)
    } else if (res.error) {
      setError(res.error)
    } else {
      closeModal()
      setError("")
      // Update state of dependants to show changes in real time
      setDependants([...dependants, res])
      setSuccess(`You have successfully created a dependant, ${res.name}`)
    }
  }

  return (
    <>
      <NavigationBar />
      <div>
        <div className="mt-5 py-10 px-10 md:mt-0 md:col-span-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl pb-4 font-bold text-gray-900">Dependants</h1>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={openModal}
              type="submit"
            >
              Add Dependant
            </button>
            <AddDependantModal closeModal={closeModal} handleCreateDependant={handleCreateDependant} isOpen={isOpen} name={name} setName={setName} />
          </div>
          {error &&
            <p className="mt-2 mb-8 text-center text-sm text-red-600">
              {error}
            </p>
          }

          {success &&
            <p className="mt-2 mb-8 text-center text-sm text-blue-600">
              {success}
            </p>
          }
          {renderTable(dependants)}

        </div>
      </div>
    </>
  )
}

Account.propTypes = { token: PropTypes.func }

Account.defaultProps = { token: null }

export default Account