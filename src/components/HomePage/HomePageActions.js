import { ADD_IMAGES, LOAD, CHANGE_VIEW } from './HomePageActionTypes'

const addImages = data => ({ type: ADD_IMAGES, data: { data } })
const Load = loading => ({ type: LOAD, data: loading })
const viewMode = mode => ({ type: CHANGE_VIEW, data: mode })

const handleImages = data => async dispatch => {
  await fetch(
    `https://pixabay.com/api/?key=12313502-f01893e35e6f505a1eb8d4b00&q=${data}&image_type=photo&pretty=true`
  )
    .then(res => res.json())
    .then(async data => {
      await dispatch(addImages(data.hits))
    })
    .catch(err => {
      throw new Error(`"error": ${err}`)
    })
}

const handleDisplayView = mode => dispatch => {
  dispatch(viewMode(mode))
}

const handleLoading = loading => async dispatch => {
  dispatch(Load(loading))
}

export default {
  handleImages,
  handleLoading,
  addImages,
  handleDisplayView,
  Load,
  viewMode
}
