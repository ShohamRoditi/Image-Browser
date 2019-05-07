import { BIG_PIC, DISABLE_LIKE } from './BigPicActionTypes'

const initialState = {
  bigImage: null,
  like: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BIG_PIC:
      return {
        ...state,
        bigImage: action.data
      }
    case DISABLE_LIKE:
      return {
        ...state,
        like: action.data
      }
    default:
      return state
  }
}
