import * as R from 'ramda';

const initialState = {}

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modalKey) => ({
  type: OPEN_MODAL,
  payload: modalKey,
});

export const closeModal = (modalKey) => ({
  type: CLOSE_MODAL,
  payload: modalKey,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return R.assoc(action.payload, true, state);
    }
    case CLOSE_MODAL: {
      return R.assoc(action.payload, false, state);
    }
    default:
      return state;
  }
}
