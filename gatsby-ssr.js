import { setConfig } from 'react-hot-loader'
import wrapRootElement from './src/wrapRootElement'

setConfig({ pureSFC: true })

export { wrapRootElement }
