// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable compat/compat */
import React, { useEffect, Fragment, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Tab } from "@headlessui/react"
import Input from "../Input"
import NavigationBar from "../NavigationBar"
import Select from "../Select"
import Routes from "../../assets/utils/routes"
import getDependants from "../../assets/utils/api/getDependants"
import createFeed from "../../assets/utils/api/createFeed"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Dashboard({ token }) {
  const [dependants, setDependants] = useState([])
  const [showDependants, setShowDependants] = useState(false)
  const [type, setType] = useState("BOTTLE")
  const [measurement, setMeasurement] = useState(null)
  const [leftBreastDuration, setLeftBreastDuration] = useState(null)
  const [rightBreastDuration, setRightBreastDuration] = useState(null)
  const [bottleDuration, setBottleDuration] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedDependant, setSelectedDependant] = useState(dependants[0])
  const [feedingTypes] = useState({
    BOTTLE: { type: "BOTTLE" },
    BREAST: { type: "BREAST" },
  })

  useEffect(() => {
    document.title = "Track a Feed - Feeding Tracker"

    const fetchData = async () => {
      const result = await getDependants(token)
      setDependants(result)
      if (result.length > 0) { setShowDependants(true) }
    }

    fetchData()
  }, [token])

  const isFalsey = input => input == 0 || input == undefined || input == null || input == false || input == ""

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Handle input validation
    if (type !== "BREAST" && type !== "BOTTLE") {
      return setError("You must provide a valid feed type for this feed!")
    } else if (isFalsey(selectedDependant)) {
      return setError("You must provide a dependant for this feed!")
    } else if (type == "BREAST" && (isFalsey(leftBreastDuration) && isFalsey(rightBreastDuration))) {
      return setError("You must provide a breast duration time!")
    } else if (type == "BOTTLE" && (isFalsey(bottleDuration))) {
      return setError("You must provide a bottle duration time!")
    } else if (type == "BOTTLE" && isFalsey(measurement)) {
      return setError("You must provide a measurement for this bottle feed!")
    }

    let res = null

    if (type == "BREAST") {
      res = await createFeed(token, {
        type,
        left_breast_duration: leftBreastDuration,
        right_breast_duration: rightBreastDuration,
        dependant_id: selectedDependant._id,
        dependant_name: selectedDependant.name,
      })
    } else {
      res = await createFeed(token, {
        type,
        measurement,
        bottle_duration: bottleDuration,
        dependant_id: selectedDependant._id,
        dependant_name: selectedDependant.name,
      })
    }

    if (res.message) {
      setError(res.message)
    } else if (res.error) {
      setError(res.error)
    } else {
      setError("")
      setSuccess("You have successfully logged a feeding session! You can view this in History.")
    }
  }

  return (
    <>
      <NavigationBar active={Routes.Dashboard} />
      <div>
        <div className="mt-5 py-10 px-10 md:mt-0 md:col-span-2">
          <h1 className="text-3xl pb-4 font-bold text-gray-900">Track a Feed</h1>
          {!showDependants ?
            (<p className="px-24 py-24 text-center text-lg text-blue-600">
              You have no Dependants. You must have an existing Dependant in order to track a feed.
              <Link className="font-bold" to={Routes.Account}>
                {" "}Click here to create a Dependant.
              </Link>
            </p>)
            :
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="w-full px-2 py-4 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                    {Object.keys(feedingTypes).map(feed => (
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                            "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                          )
                        }
                        key={feed}
                      >
                        {feed}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      {Object.values(feedingTypes).map(feed => (
                        <Tab.Panel
                          className={classNames(
                            "bg-white rounded-xl p-3",
                            "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                          )}
                          key={feed.type}
                          onClick={() => setType(feed.type)}
                        >
                          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <Select dependants={dependants} selected={selectedDependant} setSelected={setSelectedDependant} />
                            {feed.type == "BOTTLE" && <Input attribute="measurement" label="Measurement" placeholder="Measurement (mL)" setValue={setMeasurement} type="text" value={measurement} />}
                            {feed.type == "BREAST" && <Input attribute="leftBreastDuration" label="Left Breast Duration" placeholder="15 (mins)" setValue={setLeftBreastDuration} type="number" value={leftBreastDuration} />}
                            {feed.type == "BREAST" && <Input attribute="rightBreastDuration" label="Right Breast Duration" placeholder="15 (mins)" setValue={setRightBreastDuration} type="number" value={rightBreastDuration} />}
                            {feed.type == "BOTTLE" && <Input attribute="bottleDuration" label="Bottle Duration" placeholder="15 (mins)" setValue={setBottleDuration} type="number" value={bottleDuration} />}
                          </div>
                        </Tab.Panel>
                      ))}

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

                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          type="submit"
                        >
                          Track Feed
                        </button>
                      </div>
                    </div>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </form>
          }
        </div>
      </div>
    </>
  )
}

Dashboard.propTypes = { token: PropTypes.func.isRequired }
Dashboard.defaultProps = { token: null }
