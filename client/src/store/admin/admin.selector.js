import { createSelector } from 'reselect';

const selectAdminMem = (state) => state.admin;

export const selectBarber = createSelector(
  [selectAdminMem],
  (cart) => cart.barber
);

export const selectUser = createSelector(
    [selectAdminMem],
    (cart) => cart.user
)

export const selectProduct = createSelector(
    [selectAdminMem],
    (cart) => cart.product
)

export const selectOrder = createSelector(
    [selectAdminMem],
    (cart) => cart.order
)

