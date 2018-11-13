import { createStore } from 'easy-peasy'
import { save, load } from 'redux-localstorage-simple'

const store = createStore(
  {
    cart: {
      items: [],
      add: (state, id) => {
        state.items.push(id)
      },
      remove: (state, id) => {
        state.items.splice(state.items.findIndex(x => x === id), 1)
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
