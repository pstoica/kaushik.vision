import facepaint from 'facepaint'

const breakpoints = ['32em', '48em', '64em']
const secondary = '#ffcc00'
const background = '#FFFCF1';
const primary = '#a15aff'
const theme = {
  colors: {
    black: '#555',
    gray: '#888',
    background,
    primary,
    secondary,
  },
  fonts: {
    primary: '"Cardo", serif',
    secondary: '"Josefin Sans", sans-serif',
  },
  fontSize: [0, 12, 14, 16, 24, 32, 48, 64].map(x => `${x}px`),
  scale: [0, 4, 8, 16, 32, 64, 128, 256].map(x => `${x}px`),
  breakpoints,
  mq: facepaint(breakpoints.map(x => `@media(min-width: ${x})`)),
}

export default theme
