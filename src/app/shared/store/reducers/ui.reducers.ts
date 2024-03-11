import { Action, createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';

export interface UiState {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
  confirmCallback?: () => void; // Un callback opcional para la acción de confirmación
  isLoading: boolean;
}

export const initialState: UiState = {
  showModal: false,
  modalTitle: '',
  modalMessage: '',
  confirmCallback: undefined, // Inicialmente no hay callback
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showModal, (state, { title, message, confirmCallback }) => ({
    ...state,
    showModal: true,
    modalTitle: title,
    modalMessage: message,
    confirmCallback, // Establecemos el callback aquí
  })),
  on(UiActions.hideModal, (state) => ({
    ...state,
    showModal: false,
    confirmCallback: undefined, // Reseteamos el callback al ocultar el modal
  })),
  on(UiActions.startLoading, (state) => ({ ...state, isLoading: true })),
  on(UiActions.stopLoading, (state) => ({ ...state, isLoading: false }))
  // No necesitas una acción confirmAction si manejas la confirmación con el callback
);

export function reducer(state: UiState | undefined, action: Action) {
  return uiReducer(state, action);
}
