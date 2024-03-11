// src/app/store/actions/ui.actions.ts
import { createAction, props } from '@ngrx/store';

export const showModal = createAction(
  '[Shared UI] Show Modal',
  props<{
    title: string;
    message: string;
    confirmCallback?: () => void;
  }>()
);

export const hideModal = createAction('[Shared UI] Hide Modal');
// Nueva acción para confirmar una acción
export const confirmAction = createAction('[UI] Confirm Action');
