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
  outline: 0;

  &:hover, &:focus {
    box-shadow: 1px 1px 0px ${theme.colors.primary};
  }

  &:active {
    transform: translate(1px, 1px);
    box-shadow: none;
  }


  &:disabled {
    color: ${theme.colors.gray};
    border-color: ${theme.colors.gray};
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`

export default Button
