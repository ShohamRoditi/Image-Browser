import SHOW_FAV_LIST from './FavoritesActionTypes'

const initialState = {
  favList: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FAV_LIST:
      return {
        ...state,
        favList: action.data
      }
    default:
      return state
  }
}
