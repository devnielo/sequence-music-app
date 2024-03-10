import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SongActions from '../actions/song.actions';
import { SongService } from '../../services/songs.service';

@Injectable()
export class SongEffects {
  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongs),
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
      mergeMap((action) =>
        this.songService.getSongById(action.id).pipe(
          map((response) => {
            const song: any = response;
            return SongActions.loadSongSuccess({ song });
          }),
          catchError((error) => of(SongActions.loadSongFailure({ error })))
        )
      )
    )
  );

  addSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.addSong),
      mergeMap((action) =>
        this.songService.addSong(action.song).pipe(
          map((response) => {
            const song: any = response;
            return SongActions.addSongSuccess({ song });
          }),
          catchError((error) => of(SongActions.addSongFailure({ error })))
        )
      )
    )
  );

  updateSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.updateSong),
      mergeMap((action) =>
        this.songService.updateSong(action.song).pipe(
          map((response) => {
            const song: any = response;
            return SongActions.updateSongSuccess({ song });
          }),
          catchError((error) => of(SongActions.updateSongFailure({ error })))
        )
      )
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

  constructor(private actions$: Actions, private songService: SongService) {}
}
