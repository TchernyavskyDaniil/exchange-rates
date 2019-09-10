import styled from 'styled-components'

export const Rates = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const RateInfo = styled.div``

export const RateDate = styled.span``

export const Rate = styled.select``

export const Option = styled.option`
  min-width: 40px;
  margin-left: 10px;
`

export const Input = styled.input`
  min-width: 80px;
  margin-right: 10px;
`

export const ErrorDesc = styled.span`
  color: red;
  font-size: 18px;
  line-height: 20px;
`

export const FromContainer = styled.div`
  margin-top: 20px;
`

export const DescRates = styled.p`
  margin-top: 20px;
  color: ${({ emptyFields }) => (emptyFields ? 'red' : 'black')};
`

export const ToContainer = styled(FromContainer)``
