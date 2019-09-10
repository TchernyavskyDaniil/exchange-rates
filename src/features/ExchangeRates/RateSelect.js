import React, { useMemo } from 'react'
import PT from 'prop-types'

import { Option, Rate } from './styles'

const RateSelect = ({ value, onChange, isDisabled, options, disabledOption }) => {
  const renderOptions = useMemo(function() {
    return (
      options.map(({ currency, id }) => (
        <Option value={currency} key={id} disabled={currency === disabledOption}>
          {currency}
        </Option>
      ))
    )
  }, [options, disabledOption])
  return (
    <Rate value={value} onChange={onChange} disabled={isDisabled}>
      {renderOptions}
    </Rate>
  )
}

RateSelect.defaultProps = {
  value: '',
  onChange: () => {},
  isDisabled: false,
  options: [],
  disabledOption: '',
}

RateSelect.propTypes = {
  value: PT.string,
  onChange: PT.func,
  isDisabled: PT.bool,
  options: PT.arrayOf(
    PT.shape({
      currency: PT.string,
      id: PT.number,
    }),
  ),
  disabledOption: PT.string,
}

export default RateSelect
