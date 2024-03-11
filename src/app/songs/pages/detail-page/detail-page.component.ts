import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
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
export class DetailPageComponent implements OnInit {
  song$: Observable<Song | undefined>;
  loading$: Observable<boolean>;
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
    this.song$ = this.store.select(fromSongSelectors.selectCurrentSong).pipe(
      map((song) => song ?? undefined) // Convertir null a undefined
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const songId = +params['id']; // + convierte el parámetro a número
      this.store.dispatch(SongActions.loadSong({ id: songId }));
    });
  }

  deleteSongConfirm(id: number) {
    this.store.dispatch(UiActions.showModal({
      title: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta canción?',
      confirmAction: true
    }));
  }

  deleteSong(id: number) {
    this.store.dispatch(SongActions.deleteSong({ id }));
    this.router.navigate(['/songs']).then(() => {
      this.store.dispatch(UiActions.showModal({
        title: 'Eliminación completada',
        message: 'La canción ha sido eliminada correctamente.',
        confirmAction: true
      }));
    });
  }

  navigateBack(): void {
    this.router.navigate(['/songs']);
  }

  navigateToEdit(songId: number): void {
    this.router.navigate(['/songs/edit', songId]);
  }

}
