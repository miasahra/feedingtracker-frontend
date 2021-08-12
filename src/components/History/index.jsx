import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
// import _ from "lodash"
import { Link } from "react-router-dom"
import NavigationBar from "../NavigationBar"
import Routes from "../../assets/utils/routes"
import getHistory from "../../assets/utils/api/getHistory"
// import getDependants from "../../assets/utils/api/getDependants"
// eslint-disable-next-line import/extensions
import BabyBottle from "../../assets/img/baby-bottle.png"
import BreastFeeding from "../../assets/img/breast-feeding.jpg"

function renderTable(feeds, type) {
  const sortedFeeds = feeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

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
                    Type
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Date
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Name
                  </th>
                  {type == "BOTTLE" &&

                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Measurement
                    </th>
                  }
                  {type == "BREAST" &&
                    (<>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Left Breast Duration
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        scope="col"
                      >
                        Right Breast Duration
                      </th>
                    </>)
                  }
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Total Duration
                  </th>
                  <th className="relative px-6 py-3" scope="col">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedFeeds.map((feed) => {
                  const toDate = new Date(feed.createdAt)
                  const readableDate = toDate.toLocaleDateString()
                  const rightBreastDuration = feed.right_breast_duration ? `${feed.right_breast_duration} minutes` : "N/A"
                  const leftBreastDuration = feed.left_breast_duration ? `${feed.left_breast_duration} minutes` : "N/A"
                  const totalDuration = `${feed.total_duration} minutes`
                  const measurement = feed.measurement ? `${feed.measurement} mL` : "N/A"

                  return (
                    <tr key={feed.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img alt="" className="h-10" src={feed.type == "BREAST" ? BreastFeeding : BabyBottle} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{readableDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{feed.dependant_name}</div>
                      </td>
                      {type == "BOTTLE" &&
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-600">
                            {measurement}
                          </span>
                        </td>
                      }
                      {type == "BREAST" &&
                        (<>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-600">
                              {leftBreastDuration}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-600">
                              {rightBreastDuration}
                            </span>
                          </td>
                        </>)
                      }
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-600">
                          {totalDuration}
                        </span>
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

export default function History({ token }) {
  const [feeds, setFeeds] = useState([])
  // const [dependants, setDependants] = useState([])

  useEffect(() => {
    document.title = "History - Feeding Tracker"

    const fetchFeeds = async () => {
      const result = await getHistory(token)
      setFeeds(result)
    }

    // const fetchDependants = async () => {
    //   const result = await getDependants(token)
    //   setDependants(result)
    // }

    fetchFeeds()
    // fetchDependants()
  }, [token])

  // const formatFeedsByDependant = () => {
  //   const feedGroup = _.groupBy(feeds, "dependant_id")
  //   const dependantGroup = _.groupBy(dependants, "_id")
  //   const mergedArrays = _.merge(feedGroup, dependantGroup)
  //   // eslint-disable-next-line no-debugger
  //   debugger
  //   const filteredFeeds = mergedArrays.filter(feed => feed.type)
  //   console.log("filteredFeeds", filteredFeeds)

  //   return filteredFeeds
  // }

  // console.log("feeds", feeds)
  // console.log("dependants", dependants)

  // console.log("formatted: ", formatFeedsByDependant())

  const breastFeeds = feeds.filter(feed => feed.type == "BREAST")
  const bottleFeeds = feeds.filter(feed => feed.type == "BOTTLE")

  return (
    <>
      <NavigationBar active={Routes.History} />
      <div className="py-10 px-10">
        <h1 className="text-3xl pb-4 font-bold text-gray-900">Feed History</h1>
        {breastFeeds.length > 0 &&
          <div>
            <h2 className="text-2xl pb-4 font-bold text-gray-700">Breast Feeds</h2>
            {renderTable(breastFeeds, "BREAST")}
          </div>
        }
        {bottleFeeds.length > 0 &&
          <div className="mt-6">
            <h2 className="text-2xl pb-4 font-bold text-gray-700">Bottle Feeds</h2>
            {renderTable(bottleFeeds, "BOTTLE")}
          </div>
        }
        {breastFeeds.length < 1 && bottleFeeds.length < 1 &&
          (<p className="px-24 py-24 text-center text-lg text-blue-600">
            You have no feed history. You must have an existing Dependant in order to track a feed.
            <Link className="font-bold" to={Routes.Dashboard}>
              {" "}Click here to track a feed.
            </Link>
          </p>)
        }
      </div>
    </>
  )
}

History.propTypes = { token: PropTypes.func.isRequired }
History.defaultProps = { token: null }
