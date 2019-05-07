import { ADD_IMAGES, LOAD, CHANGE_VIEW } from './HomePageActionTypes'

const initialState = {
  images: {},
  loading: true,
  displayView: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        displayView: action.data
      }
    case ADD_IMAGES:
      return {
        ...state,
        images: action.data
      }
    case LOAD:
      return {
        ...state,
        loading: action.data
      }
    default:
      return state
  }
}
