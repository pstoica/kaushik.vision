import React from 'react'
import { StoreProvider } from 'easy-peasy'
import store from './store'

export default ({ element }) => (
  <StoreProvider store={store}>{element}</StoreProvider>
)
