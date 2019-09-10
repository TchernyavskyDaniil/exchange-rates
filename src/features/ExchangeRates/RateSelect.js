import React, { memo } from 'react'

import { Option, Rate } from './styles'

const RateSelect = ({ value, onChange, isDisabled, options }) => (
  <Rate value={value} onChange={onChange} disabled={isDisabled}>
    {options.map(({ currency, id }) => (
      <Option value={currency} key={id}>
        {currency}
      </Option>
    ))}
  </Rate>
)

export default memo(RateSelect, function areEqual(prevProps, nextProps) {
  return prevProps.value === nextProps.value || prevProps.isDisabled !== nextProps.isDisabled
})
