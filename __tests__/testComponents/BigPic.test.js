import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import BigPicActions from '../../src/components/BigPic/BigPicActions'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('BigPicActions testing', () => {
  test('showBigPic BigPicActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(BigPicActions.pushBigPic()).toHaveProperty('type', 'BIG_PIC')
    expect(store.getState().BigPic).toHaveProperty('bigImage', null)
    store.dispatch(BigPicActions.showBigPic('first image'))
    expect(store.getState().BigPic).toHaveProperty('bigImage', 'first image')
  })

  test('changeLikeMode BigPicActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(BigPicActions.disable().type).toEqual('DISABLE_LIKE')
    expect(store.getState().BigPic).toHaveProperty('like', false)
    store.dispatch(BigPicActions.changeLikeMode(true))
    expect(store.getState().BigPic).toHaveProperty('like', true)
  })
})
