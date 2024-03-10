import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CompanyActions from '../actions/company.actions';
import { CompanyService } from '../../services/company.service';

@Injectable()
export class CompanyEffects {
  loadCompanies$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.CompanyActionTypes.LOAD_COMPANIES),
    mergeMap(() => this.companyService.getCompanies().pipe(
      map(response => {
        const companies: any = response;
        return CompanyActions.loadCompaniesSuccess({ companies });
      }),
      catchError(error => of(CompanyActions.loadCompaniesFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}
}
