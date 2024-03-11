import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  selectConfirmAction,
  selectModalMessage,
  selectModalTitle,
  selectShowModal,
} from '../../store/selectors/ui.selectors';
import * as UiActions from '../../store/actions/ui.actions';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  showModal$: Observable<boolean>;
  modalTitle$: Observable<string>;
  modalMessage$: Observable<string>;
  confirmAction$: Observable<boolean | undefined>; // Cambiado a una función

  constructor(private store: Store) {
    this.showModal$ = this.store.select(selectShowModal);
    this.modalTitle$ = this.store.select(selectModalTitle);
    this.modalMessage$ = this.store.select(selectModalMessage);
    this.confirmAction$ = this.store.select(selectConfirmAction);
  }

  close(): void {
    this.store.dispatch(UiActions.hideModal());
  }

  continue(): void {
    this.confirmAction$.pipe(take(1)).subscribe((result) => {
      console.log(result);

      if (result) {
        //action();
      }
      this.close();
    });
  }
}
