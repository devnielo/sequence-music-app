// src/app/store/reducers/ui.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';

export interface UiState {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
  confirmAction?: Function;
}

export const initialState: UiState = {
  showModal: false,
  modalTitle: '',
  modalMessage: '',
  confirmAction: undefined,
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showModal, (state, { title, message, confirmAction }) => ({
    ...state,
    showModal: true,
    modalTitle: title,
    modalMessage: message,
    confirmAction: confirmAction,
  })),
  on(UiActions.hideModal, (state) => ({
    ...state,
    showModal: false,
  }))
);
