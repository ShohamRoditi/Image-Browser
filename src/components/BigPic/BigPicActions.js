import { BIG_PIC, DISABLE_LIKE } from './BigPicActionTypes'

const pushBigPic = image => ({ type: BIG_PIC, data: image })

const showBigPic = image => dispatch => {
  dispatch(pushBigPic(image))
}

const disable = like => ({ type: DISABLE_LIKE, data: like })

const changeLikeMode = like => dispatch => {
  dispatch(disable(like))
}

export default {
  showBigPic,
  changeLikeMode,
  pushBigPic,
  disable
}
