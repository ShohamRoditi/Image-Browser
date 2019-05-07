import SHOW_FAV_LIST from './FavoritesActionTypes'

const addToFavList = images => ({ type: SHOW_FAV_LIST, data: { images } })

const updateFavList = image => dispatch => {
  dispatch(addToFavList(image))
}

export default {
  updateFavList,
  addToFavList
}
