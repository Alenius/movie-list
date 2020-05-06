import * as React from 'react'
import styled from '@emotion/styled'

import { dimensions, colors } from '../styles/variables'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding}rem;
  padding-bottom: 3rem;
  background-color: ${colors.ui.dark};
  color: ${colors.ui.accent};
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
