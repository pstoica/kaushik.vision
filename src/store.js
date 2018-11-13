import { createStore } from 'easy-peasy'
import { save, load } from 'redux-localstorage-simple'

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
    middleware: [save()],
    initialState: load(),
  }
)

export default store
