// ui.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from '../effects/ui.effects';

export const selectUIFeature = createFeatureSelector<UiState>('ui');

export const selectShowModal = createSelector(
  selectUIFeature,
  (state: UiState) => state.showModal
);

export const selectModalTitle = createSelector(
  selectUIFeature,
  (state: UiState) => state.modalTitle
);

export const selectModalMessage = createSelector(
  selectUIFeature,
  (state: UiState) => state.modalMessage
);

export const selectConfirmAction = createSelector(
  selectUIFeature,
  (state: UiState) => state.confirmAction
);
