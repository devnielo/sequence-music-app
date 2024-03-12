import { createAction, props } from '@ngrx/store';

// Acción para mostrar un modal
export const showModal = createAction(
  '[Shared UI] Show Modal',
  props<{
    title: string;            // Título del modal
    message: string;          // Mensaje del modal
    confirmCallback?: () => void; // Callback opcional para confirmar una acción
    closable?: boolean
  }>()
);

// Acción para ocultar un modal
export const hideModal = createAction('[Shared UI] Hide Modal');

// Acciones para controlar el estado de carga
export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction('[UI] Stop Loading');
