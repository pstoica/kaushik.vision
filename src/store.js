import { createStore } from 'easy-peasy'
import { save, load } from 'redux-localstorage-simple'

import lib from './stdlib'

const store = createStore(
  {
    cart: {
      items: [],
      add: (state, id) => {
        state.items.push(id)
      },
      remove: (state, id) => {
        state.items = state.items.filter(x => x !== id)
      },
      clear: state => {
        state.items = []
      },
    },
    inventory: {},
    datoMap: {},
    hasSynced: false,
    setInventory(state, inventory) {
      Object.assign(state.inventory, inventory)

      state.cart.items = state.cart.items.filter((id, i) => {
        return state.inventory[id] && state.inventory[id] > 0
      })
    },
    setDatoMap(state, datoArray) {
      if (state.hasSynced) {
        return
      }

      const map = {}
      datoArray.forEach(x => {
        map[x.id] = x
      })

      state.hasSynced = true
      state.datoMap = map
      state.cart.items = state.cart.items.filter((id) => {
        return !!state.datoMap[id]
      })
    }
  },
  typeof window !== 'undefined'
    ? {
        devTools: process.env.NODE_ENV === 'development',
        middleware: [save({ states: ['cart'] })],
        initialState: load({ states: ['cart']}),
      }
    : {}
)

if (typeof window !== 'undefined') {
  lib.sunupnyc.h2o['@0.0.1'].inventory().then(result => {
    store.dispatch.setInventory(result)
  })
}


export default store
