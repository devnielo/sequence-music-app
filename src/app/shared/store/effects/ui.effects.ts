// src/app/store/reducers/ui.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';

export interface UiState {
  showModal: boolean;
  modalTitle: string;
  modalMessage: string;
}

export const initialState: UiState = {
  showModal: false,
  modalTitle: '',
  modalMessage: ''
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.showModal, (state, { title, message }) => ({
    ...state,
    showModal: true,
    modalTitle: title,
    modalMessage: message
  })),
  on(UiActions.hideSongModal, state => ({
    ...state,
    showModal: false
  }))
);
