import { createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';

export interface UiState {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
  confirmCallback?: () => void; // Función opcional para confirmar la acción
  confirmAction: boolean | undefined;
}

export const initialState: UiState = {
  showModal: false,
  modalTitle: '',
  modalMessage: '',
  confirmCallback: undefined, // Inicializada como undefined
  confirmAction: undefined, // Inicializada como undefined
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showModal, (state, { title, message, confirmCallback }) => ({
    ...state,
    showModal: true,
    modalTitle: title,
    modalMessage: message,
    confirmCallback: confirmCallback, // Actualizado para manejar confirmCallback
  })),
  on(UiActions.hideModal, (state) => ({
    ...state,
    showModal: false,
    confirmCallback: undefined, // Resetear confirmCallback cuando se oculta el modal
  })),
);
