import { createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';
export interface UiState {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
  confirmCallback?: () => void;
  closable: boolean; // Agrega esta propiedad
}

export const initialState: UiState = {
  showModal: false,
  modalTitle: '',
  modalMessage: '',
  confirmCallback: undefined,
  closable: true, // Por defecto, el modal es cerrable
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showModal, (state, { title, message, confirmCallback, closable = true }) => ({
    ...state,
    showModal: true,
    modalTitle: title,
    modalMessage: message,
    confirmCallback: confirmCallback,
    closable: closable // Asegúrate de manejar la propiedad 'closable'
  })),
  on(UiActions.hideModal, (state) => ({
    ...state,
    showModal: false,
    confirmCallback: undefined, // Resetear confirmCallback cuando se oculta el modal
  })),
);
