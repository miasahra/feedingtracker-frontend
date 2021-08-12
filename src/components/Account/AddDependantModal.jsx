import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import PropTypes from "prop-types"

function AddDependantModal({ handleCreateDependant, isOpen, closeModal, setName, name }) {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            aria-hidden="true"
            className="inline-block h-screen align-middle"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <form action="#" method="POST" onSubmit={handleCreateDependant}>
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Dependant
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    By adding a new dependant, you can create and track feeds for them.
                  </p>
                </div>

                <label className="mt-4 block text-sm font-medium text-gray-700" htmlFor="price">
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    id="name"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    type="text"
                    value={name}
                  />
                </div>


                <div className="mt-4">
                  <button
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    type="submit"
                  >
                    Add Dependant
                  </button>
                </div>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

AddDependantModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  handleCreateDependant: PropTypes.func.isRequired,
}

AddDependantModal.defaultProps = {
  isOpen: false,
  closeModal: () => { },
  name: "",
  setName: () => { },
  handleCreateDependant: () => { },
}

export default AddDependantModal