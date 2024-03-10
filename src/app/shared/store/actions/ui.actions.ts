// src/app/store/actions/ui.actions.ts
import { createAction, props } from '@ngrx/store';

export const showModal = createAction(
  '[Song UI] Show Modal',
  props<{ title: string; message: string }>()
);

export const hideSongModal = createAction('[Song UI] Hide Modal');
