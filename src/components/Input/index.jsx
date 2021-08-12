import React from "react"
import PropTypes from "prop-types"

function Input({ label, type, placeholder, attribute, value, setValue }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor="price">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="block w-full pr-12 sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
          id={attribute}
          name={attribute}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
  value: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
}
Input.defaultProps = {
  label: String,
  type: String,
  placeholder: String,
  attribute: String,
  value: null,
  setValue: () => { },
}

export default Input
