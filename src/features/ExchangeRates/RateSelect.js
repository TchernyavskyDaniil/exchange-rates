import React, { memo } from 'react'
import PT from 'prop-types'

import { Option, Rate } from './styles'

const RateSelect = ({ value, onChange, isDisabled, options, disabledOption }) => (
  <Rate value={value} onChange={onChange} disabled={isDisabled}>
    {options.map(({ currency, id }) => (
      <Option value={currency} key={id} disabled={currency === disabledOption}>
        {currency}
      </Option>
    ))}
  </Rate>
)

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
  options: PT.arrayOf(PT.shape({
    currency: PT.string,
    id: PT.number
  })),
  disabledOption: PT.string,
}

export default memo(RateSelect, function areEqual(prevProps, nextProps) {
  return prevProps.value === nextProps.value || prevProps.isDisabled !== nextProps.isDisabled
})
