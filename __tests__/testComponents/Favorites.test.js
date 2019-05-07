import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import FavoritesActions from '../../src/components/Favorites/FavoritesActions'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('FavoritesActions testing', () => {
  test('showBigPic FavoritesActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(FavoritesActions.addToFavList()).toHaveProperty('type', 'SHOW_FAV_LIST')
    expect(store.getState().Favorites).toHaveProperty('favList', {})
    store.dispatch(
      FavoritesActions.updateFavList([{ key: 'first image' }, { key: 'second image' }])
    )
    expect(store.getState().Favorites.favList).toHaveProperty('images', [
      { key: 'first image' },
      { key: 'second image' }
    ])
  })
})
