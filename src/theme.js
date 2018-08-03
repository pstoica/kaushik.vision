import facepaint from 'facepaint'
import { lighten } from 'polished'

const breakpoints = ['32em', '48em', '64em']

const theme = {
  colors: {
    black: '#555',
    gray: '#888',
    white: '#fff',
    primary: '#F45433',
    secondary: lighten(0.34, '#6DD493'),
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
