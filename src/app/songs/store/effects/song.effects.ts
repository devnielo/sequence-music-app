import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';
import * as SongActions from '../actions/song.actions';
import { SongService } from '../../services/songs.service';
import { Store } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';
import { ArtistService } from 'src/app/artists/services/artists.service';
import * as ArtistActions from '../../../artists/store/actions/artist.actions';

@Injectable()
export class SongEffects {
  constructor(
    private actions$: Actions,
    private songService: SongService,
    private store: Store<SongState>,
    private artistService: ArtistService
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
    tap(() => this.store.dispatch(SongActions.loadingStart())),
    mergeMap((action) =>
      this.songService.addSong(action.song).pipe(
        map((song) => {
          console.log("Canción añadida:", song);
          const data: any = song;
          return SongActions.addSongSuccess({ song: data });
        }),
        catchError((error) => of(SongActions.addSongFailure({ error })))
      )
    )
  )
);

  loadArtistsForSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongsSuccess),
      mergeMap((action) => {
        const artistIds = [
          ...new Set(action.songs.flatMap((song) => song.artist)),
        ];
        console.log(artistIds);

        return artistIds.map((id) => ArtistActions.loadArtist({ id }));
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
          console.log(response);

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
      mergeMap((action) =>
        this.songService.deleteSong(action.id).pipe(
          map(() => SongActions.deleteSongSuccess({ id: action.id })),
          catchError((error) => of(SongActions.deleteSongFailure({ error })))
        )
      )
    )
  );
}
