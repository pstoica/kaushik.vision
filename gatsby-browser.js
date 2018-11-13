import { setConfig } from 'react-hot-loader'
import wrap from './src/wrapRootElement'

setConfig({ pureSFC: true })

export const wrapRootElement = wrap
