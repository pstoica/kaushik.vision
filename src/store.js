import { createStore } from 'easy-peasy'

const store = createStore(
  {
    cart: {
      items: [],
      add: (state, sku) => {
        state.items.push(sku)
      },
      remove: (state, sku) => {
        state.items.splice(state.items.findIndex(x => x === sku), 1)
      },
    },
  },
  {
    devTools: true,
  }
)

export default store
