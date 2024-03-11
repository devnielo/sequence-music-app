import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectConfirmCallback,
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
  confirmCallback$: Observable<(() => void) | undefined>;

  constructor(private store: Store) {
    this.showModal$ = this.store.select(selectShowModal);
    this.modalTitle$ = this.store.select(selectModalTitle);
    this.modalMessage$ = this.store.select(selectModalMessage);
    this.confirmCallback$ = this.store.select(selectConfirmCallback);
  }

  close(): void {
    this.store.dispatch(UiActions.hideModal());
  }

  continue(): void {
    this.confirmCallback$.subscribe((callback) => {
      if (callback) {
        callback();
      }
      this.close();
    });
  }
}
