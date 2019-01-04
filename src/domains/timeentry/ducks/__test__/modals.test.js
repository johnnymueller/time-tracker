import reducer, * as actionCreators from '../modals';

const modalKey = 'testKey';
const getState = (actionCreator, initialState = {}) => (
  [actionCreator(modalKey)].reduce(reducer, initialState)[modalKey]
);

describe('modal ducks', () => {
  describe('OPEN_MODAL', () => {
    describe('when the modalKey does not exist', () => {
      it('opens the modal', () => {
        expect(getState(actionCreators.openModal)).toBe(true);
      });
    });
    describe('when the modalKey does exist', () => {
      it('opens the modal', () => {
        expect(getState(actionCreators.openModal, {[modalKey]: false})).toBe(true);
      });
    });
  });

  describe('CLOSE_MODAL', () => {
    describe('when the modalKey does not exist', () => {
      it('does nothing', () => {
        expect(getState(actionCreators.closeModal)).toBe(false);
      });
    });
    describe('when the modalKey does exist', () => {
      it('closes the modal', () => {
        expect(getState(actionCreators.closeModal, {[modalKey]: true})).toBe(false);
      });
    });
  });
});
