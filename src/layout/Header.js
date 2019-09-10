import React from 'react'
import styled from 'styled-components'

const HeaderView = styled.header`
  background-color: lightcyan;
  border-bottom: 1px solid lavender;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`

const Title = styled.h1`
  margin: 0;
`

const LinkToSource = styled.a`
  text-decoration: none;
  color: blue;
  font-size: 24px;
  transition: 0.4s ease color;
  padding: 20px 0;

  &:hover {
    color: slateblue;
  }
`

const LinkToAPI = styled(LinkToSource)`
  padding: 0;
`

const linkToSource = 'Link to source'

const linkToAPIDoc = 'API Documentation'

const Header = () => (
  <HeaderView>
    <Title> Simple React exchange rates</Title>
    <LinkToSource
      href="https://github.com/TchernyavskyDaniil/exchange-rates"
      target="_blank"
      title={linkToSource}
    >
      {linkToSource}
    </LinkToSource>
    <LinkToAPI href="https://ratesapi.io/documentation/" title={linkToAPIDoc}>
      {' '}
      {linkToAPIDoc}{' '}
    </LinkToAPI>
  </HeaderView>
)

export default Header
