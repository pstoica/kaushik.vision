import { createStore } from 'redux'

function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_ITEM':
      console.log({ ...state, cart: [...state.cart, action.sku] })
      return { ...state, cart: [...state.cart, action.sku] }
    case 'REMOVE_ITEM':
      return { ...state, cart: state.cart.filter(x => x !== action.sku) }
    default:
      return state
  }
}

export default () => {
  return createStore(reducer, {
    cart: [],
    products: [],
  })
}
