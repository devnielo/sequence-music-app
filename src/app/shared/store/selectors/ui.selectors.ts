import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from '../reducers/ui.reducers';

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

export const selectIsLoading = createSelector(
  selectUIFeature,
  (state: UiState) => state.isLoading
);

export const selectConfirmCallback = createSelector(
  selectUIFeature,
  (state: UiState) => state.confirmCallback
);
