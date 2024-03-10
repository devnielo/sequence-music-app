import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectModalMessage, selectModalTitle, selectShowModal } from '../../store/selectors/ui.selectors';
import { hideSongModal } from '../../store/actions/ui.actions';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  showModal$: Observable<boolean>;
  modalTitle$: Observable<string>;
  modalMessage$: Observable<string>;

  constructor(private store: Store) {
    this.showModal$ = this.store.select(selectShowModal);
    this.modalTitle$ = this.store.select(selectModalTitle);
    this.modalMessage$ = this.store.select(selectModalMessage);
  }

  close(): void {
    this.store.dispatch(hideSongModal());
  }

  continue(): void {
    this.close();
  }
}