import { combineReducers } from 'redux'
import BigPicReducer from './components/BigPic/BigPicReducer'
import HomePageReducer from './components/HomePage/HomePageReducer'
import FavoritesReducer from './components/Favorites/FavoritesReducer'

export default combineReducers({
  BigPic: BigPicReducer,
  HomePage: HomePageReducer,
  Favorites: FavoritesReducer
})
