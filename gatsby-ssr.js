import wrapWithProvider from './src/wrapWithProvider'
import { setConfig } from 'react-hot-loader'

export const wrapRootElement = wrapWithProvider

setConfig({ pureSFC: true })
