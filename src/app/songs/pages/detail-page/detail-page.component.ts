import { selectCurrentSong } from './../../store/selectors/song.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Song } from '../../interfaces/song.interface';
import { SongState } from '../../store/reducers/song.reducer';
import * as SongActions from '../../store/actions/song.actions';
import * as fromSongSelectors from '../../store/selectors/song.selectors';
import * as UiActions from '../../../shared/store/actions/ui.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
  song$: Observable<Song | null>;
  loading$: Observable<boolean>;
  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private location: Location
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

  onDelete(songData: Song): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que quieres eliminar esta canción?',
        confirmCallback: () => this.deleteSong(songData.id),
      })
    );
  }

  deleteSong(id: number): void {

    this.store.dispatch(UiActions.startLoading()); // Iniciar el loader

    this.store.dispatch(SongActions.deleteSong({ id }));

    // Llamar a la función successCallback cuando la canción se haya eliminado y el loader se haya detenido
    const successCallback = () => {
      this.store.dispatch(UiActions.stopLoading()); // Detener el loader
      this.showSuccessModal(); // Mostrar el modal de éxito después de la eliminación
    };

    // Esperar un corto período de tiempo antes de llamar a la función successCallback
    setTimeout(successCallback, 1000); // Ajusta el tiempo según sea necesario
  }


  showSuccessModal(): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Eliminación Completada',
        message: 'La canción ha sido eliminada correctamente.',
        confirmCallback: () => {
          this.navigateBack(); // Navegar hacia atrás solo después de aceptar el modal
        },
      })
    );
  }

  navigateBack(): void {
    this.store.dispatch(UiActions.hideModal());
    this.location.back();
  }

  navigateToEdit(songId: number): void {
    this.router.navigate(['/songs/edit', songId]);
  }
}
