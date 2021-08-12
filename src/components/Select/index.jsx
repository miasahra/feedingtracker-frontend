import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

function Select({ dependants, selected, setSelected }) {
  return (
    <Fragment>
      <label className="block text-sm font-medium text-gray-700" htmlFor="price">
        Dependant
      </label>
      <Listbox onChange={setSelected} value={selected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-blue-500 sm:text-sm">
            <span className="block truncate">{selected?.name || "Choose a Dependant"}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                aria-hidden="true"
                className="w-5 h-5 text-gray-400"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            className="z-[1000]"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {dependants.map(dependant => (
                <Listbox.Option
                  className={({ active }) =>
                    `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  key={dependant.id}
                  value={dependant}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        {dependant.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-blue-600" : "text-blue-600"} absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon aria-hidden="true" className="w-5 h-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </Fragment>
  )
}

Select.propTypes = {
  dependants: PropTypes.array.isRequired,
  selected: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
}

Select.defaultProps = {
  dependants: [],
  selected: null,
  setSelected: () => { },
}

export default Select
