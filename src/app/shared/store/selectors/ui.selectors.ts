import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from '../effects/ui.effects';

// Selector para obtener el estado de la UI
export const selectUIFeature = createFeatureSelector<UiState>('ui');

// Selector para obtener el estado del modal
export const selectShowModal = createSelector(
  selectUIFeature,
  (state: UiState) => state.showModal
);

// Selector para obtener el título del modal
export const selectModalTitle = createSelector(
  selectUIFeature,
  (state: UiState) => state.modalTitle
);

// Selector para obtener el mensaje del modal
export const selectModalMessage = createSelector(
  selectUIFeature,
  (state: UiState) => state.modalMessage
);
