import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  selectConfirmCallback,
  selectModalMessage,
  selectModalTitle,
  selectShowModal,
  selectModalClosable
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
  confirmCallback$: Observable<(() => void) | undefined>;
  closable$: Observable<boolean>;

  constructor(private store: Store) {
    this.showModal$ = this.store.select(selectShowModal);
    this.modalTitle$ = this.store.select(selectModalTitle);
    this.modalMessage$ = this.store.select(selectModalMessage);
    this.confirmCallback$ = this.store.select(selectConfirmCallback);
    this.closable$ = this.store.select(selectModalClosable); // Asegúrate de tener un selector para esto
  }

  close(): void {
    this.store.dispatch(UiActions.hideModal());
  }

  continue(): void {
    this.confirmCallback$.pipe(take(1)).subscribe((callback) => {
      if (callback) {
        callback();
      }
      this.close();
    });
  }
}
