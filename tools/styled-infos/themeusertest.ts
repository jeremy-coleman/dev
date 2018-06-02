import styled from './themetest'

const Button = styled('button')`
  padding: 20px;
  background-color: ${props => props.color};
  border-radius: 3px;
`

export default Button