import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';
import * as SongActions from '../actions/song.actions';
import { SongService } from '../../services/songs.service';
import { Song } from '../../interfaces/song.interface';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { Store } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';

@Injectable()
export class SongEffects {
  constructor(
    private actions$: Actions,
    private songService: SongService,
    private store: Store<SongState> // Inyecta el store
  ) {}

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongs),
      tap(() => this.store.dispatch(SongActions.loadingStart())), // Dispara la acción de inicio de carga
      mergeMap(() =>
        this.songService.getAllSongs().pipe(
          map((response) => {
            const songs: any = response;
            return SongActions.loadSongsSuccess({ songs });
          }),
          catchError((error) => of(SongActions.loadSongsFailure({ error })))
        )
      )
    )
  );

  loadSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSong),
      tap(() => this.store.dispatch(SongActions.loadingStart())), // Dispara la acción de inicio de carga
      mergeMap(async (action) => {
        try {
          const response = await firstValueFrom(
            this.songService.getSongById(action.id)
          );
          const song: any = response;
          return SongActions.loadSongSuccess({ song });
        } catch (error) {
          return SongActions.loadSongFailure({ error });
        }
      })
    )
  );

  addSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.addSong),
      tap(() => this.store.dispatch(SongActions.loadingStart())), // Dispara la acción de inicio de carga
      mergeMap(async (action) => {
        try {
          const response = await firstValueFrom(
            this.songService.addSong(action.song)
          );
          const song: any = response;
          return SongActions.addSongSuccess({ song });
        } catch (error) {
          return SongActions.addSongFailure({ error });
        }
      })
    )
  );

  updateSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.updateSong),
      tap(() => this.store.dispatch(SongActions.loadingStart())), // Dispara la acción de inicio de carga
      mergeMap(async (action) => {
        try {
          const response = await firstValueFrom(
            this.songService.updateSong(action.song)
          );
          const song: any = response;
          return SongActions.updateSongSuccess({ song });
        } catch (error) {
          return SongActions.updateSongFailure({ error });
        }
      })
    )
  );

  deleteSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.deleteSong),
      tap(() => this.store.dispatch(SongActions.loadingStart())), // Dispara la acción de inicio de carga
      mergeMap((action) =>
        this.songService.deleteSong(action.id).pipe(
          map((response) => {
            const song: any = response;
            return SongActions.deleteSongSuccess({ id: action.id });
          }),
          catchError((error) => of(SongActions.deleteSongFailure({ error })))
        )
      )
    )
  );
}
