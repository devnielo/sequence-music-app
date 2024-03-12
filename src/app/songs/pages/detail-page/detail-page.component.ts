import { selectCurrentSong } from './../../store/selectors/song.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subscription, combineLatest, map } from 'rxjs';
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
  private songSub!: Subscription;

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
    const combined$ = combineLatest([this.song$, this.loading$]).subscribe(
      ([song, loading]) => {
        if (!loading && song === null) {
          this.showNotFoundModal();
        }
      }
    );

    this.songSub = combined$;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.songSub.unsubscribe();
  }

  showNotFoundModal(): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Canción No Encontrada',
        message: 'La canción solicitada no existe o no pudo ser cargada.',
        closable: false,
        confirmCallback: () => this.navigateBack(),
      })
    );
  }

  onDelete(songData: Song): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que quieres eliminar esta canción?',
        confirmCallback: () => this.deleteSong(songData.id!),
      })
    );
  }

  deleteSong(id: number): void {
    this.store.dispatch(UiActions.startLoading());

    this.store.dispatch(SongActions.deleteSong({ id }));

    const successCallback = () => {
      this.store.dispatch(UiActions.stopLoading());
      this.showSuccessModal();
    };

    setTimeout(successCallback, 1000);
  }

  showSuccessModal(): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Eliminación Completada',
        message: 'La canción ha sido eliminada correctamente.',
        closable: false,
        confirmCallback: () => {
          this.navigateBack();
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
