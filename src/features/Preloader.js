import React from 'react'
import styled from 'styled-components'

import preloaderIcon from '../assets/icons/preloader.svg'

const PreloaderView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(3px);
  }
`

const PreloaderIconContainer = styled.div`
  position: relative;
  z-index: 100;
`

const PreloaderImage = styled.img``

const Preloader = () => (
  <PreloaderView>
    <PreloaderIconContainer>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <PreloaderImage src={preloaderIcon} />
    </PreloaderIconContainer>
  </PreloaderView>
)

export default Preloader
