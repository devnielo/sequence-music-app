import { selectCurrentSong } from './../../store/selectors/song.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Song } from '../../interfaces/song.interface';
import { SongState } from '../../store/reducers/song.reducer';
import * as SongActions from '../../store/actions/song.actions';
import * as fromSongSelectors from '../../store/selectors/song.selectors';
import * as UiActions from '../../../shared/store/actions/ui.actions';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, OnDestroy {
  song$: Observable<Song | null>;
  loading$: Observable<boolean>;
  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.song$ = this.store.select(selectCurrentSong);
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const songId = +params['id'];
      this.store.dispatch(SongActions.loadSong({ id: songId }));
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  deleteSongConfirm(id: number) {
    // Mostrar el modal de confirmación
    this.store.dispatch(
      UiActions.showModal({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que quieres eliminar esta canción?',
        confirmCallback: () => this.deleteSong(id), // Llamar a la función deleteSong si se confirma la acción
      })
    );
  }

  deleteSong(id: number) {
    console.log(id);

    this.store.dispatch(SongActions.deleteSong({ id }));
    this.router.navigate(['/songs']).then(() => {
      this.store.dispatch(
        UiActions.showModal({
          title: 'Eliminación completada',
          message: 'La canción ha sido eliminada correctamente.',
        })
      );
    });
  }

  navigateBack(): void {
    this.router.navigate(['/songs']);
  }

  navigateToEdit(songId: number): void {
    this.router.navigate(['/songs/edit', songId]);
  }
}
