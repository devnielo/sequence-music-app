// src/app/songs/store/effects/song.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SongActions from '../actions/song.actions';
import { SongService } from '../../services/songs.service';

@Injectable()
export class SongEffects {

  // Efecto para cargar canciones
  loadSongs$ = createEffect(() => this.actions$.pipe(
    ofType(SongActions.SongActionTypes.LOAD_SONGS),
    mergeMap(() => this.songService.getSongs()
      .pipe(
        map(response => {
          return SongActions.loadSongsSuccess({ songs: response.data });
        }),
        catchError(error => of(SongActions.loadSongsFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private songService: SongService
  ) {}
}
