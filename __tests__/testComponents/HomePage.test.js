import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import HomePageActions from '../../src/components/HomePage/HomePageActions'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('homepageactions testing', () => {
  test('addImages HomePageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(HomePageActions.addImages()).toHaveProperty('type', 'ADD_IMAGES')
    expect(store.getState().HomePage).toHaveProperty('images', {})
    store.dispatch(HomePageActions.addImages([{ key: 'first image' }, { key: 'second image' }]))
    expect(store.getState().HomePage.images).toHaveProperty('data', [
      { key: 'first image' },
      { key: 'second image' }
    ])
  })

  test('loading HomePageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(HomePageActions.Load().type).toEqual('LOAD')
    expect(store.getState().HomePage).toHaveProperty('loading', true)
    store.dispatch(HomePageActions.handleLoading(false))
    expect(store.getState().HomePage).toHaveProperty('loading', false)
  })

  test('displayView HomePageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(HomePageActions.viewMode()).toHaveProperty('type', 'CHANGE_VIEW')
    expect(store.getState().HomePage).toHaveProperty('displayView', false)
    store.dispatch(HomePageActions.handleDisplayView(true))
    expect(store.getState().HomePage.displayView).toEqual(true)
  })
})
