import * as R from 'ramda';
import { createSelector } from 'reselect';

const modalSelector = R.prop('modals');

// Ramda way
// export const openModalsSelector = (modalKey) => R.compose(R.propOr(false, modalKey), modalSelector);
// Reselect way
export const openModalsSelector = (modalKey) => createSelector(modalSelector, R.propOr(false, modalKey));
