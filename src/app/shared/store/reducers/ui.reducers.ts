import { Action, createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';

export interface UiState {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
  confirmCallback?: () => void;
  isLoading: boolean;
  closable: boolean; // Agrega la propiedad 'closable'
}

export const initialState: UiState = {
  showModal: false,
  modalTitle: '',
  modalMessage: '',
  confirmCallback: undefined,
  isLoading: false,
  closable: true, // Inicializa 'closable' como true
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showModal, (state, { title, message, confirmCallback, closable = true }) => ({
    ...state,
    showModal: true,
    modalTitle: title,
    modalMessage: message,
    confirmCallback: confirmCallback,
    closable: closable // Maneja 'closable'
  })),
  on(UiActions.hideModal, (state) => ({
    ...state,
    showModal: false,
    confirmCallback: undefined,
  })),
  on(UiActions.startLoading, (state) => ({ ...state, isLoading: true })),
  on(UiActions.stopLoading, (state) => ({ ...state, isLoading: false }))
);

export function reducer(state: UiState | undefined, action: Action) {
  return uiReducer(state, action);
}
