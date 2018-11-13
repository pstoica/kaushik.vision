import styled from 'react-emotion'
import theme from '../theme'

const Button = styled('button')`
  display: inline-block;
  border: 1px solid ${theme.colors.primary};
  padding: ${theme.scale[2]};
  background: transparent;
  color: ${theme.colors.primary};
  border-radius: 5px;
  text-transform: lowercase;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize[4]};
  cursor: pointer;

  &:disabled {
    color: ${theme.colors.gray};
    border-color: ${theme.colors.gray};
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default Button
