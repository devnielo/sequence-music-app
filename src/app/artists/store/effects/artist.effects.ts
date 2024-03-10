import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ArtistActions from '../actions/artist.actions';
import { ArtistService } from '../../services/artists.service';

@Injectable()
export class ArtistEffects {
  loadArtists$ = createEffect(() => this.actions$.pipe(
    ofType(ArtistActions.ArtistActionTypes.LOAD_ARTISTS),
    mergeMap(() => this.artistService.getArtists().pipe(
      map(response => {
        const artists: any = response;
        return ArtistActions.loadArtistsSuccess({ artists });
      }),
      catchError(error => of(ArtistActions.loadArtistsFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private artistService: ArtistService
  ) {}
}
