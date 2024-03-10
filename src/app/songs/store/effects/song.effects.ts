import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SongActions from '../actions/song.actions';
import { SongService } from '../../services/songs.service';
import { of } from 'rxjs';

@Injectable()
export class SongEffects {
  loadSongs$ = createEffect(() => this.actions$.pipe(
    ofType(SongActions.SongActionTypes.LOAD_SONGS),
    mergeMap(() => this.songService.getSongs().pipe(
      map(response => {
        const songs: any = response;
        return SongActions.loadSongsSuccess({ songs });
      }),
      catchError(error => of(SongActions.loadSongsFailure({ error })))
    ))
  ));

  constructor(private actions$: Actions, private songService: SongService) {}
}
