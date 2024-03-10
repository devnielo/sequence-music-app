import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CompanyActions from '../actions/company.actions';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/company.interface';

@Injectable()
export class CompanyEffects {
  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanies),
      mergeMap(() =>
        this.companyService.getAllCompanies().pipe(
          map((response) => {
            const companies: any = response;
            return CompanyActions.loadCompaniesSuccess({ companies });
          }),
          catchError((error) =>
            of(CompanyActions.loadCompaniesFailure({ error }))
          )
        )
      )
    )
  );

  addCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.addCompany),
      mergeMap(({ company }) =>
        this.companyService.addCompany(company).pipe(
          map((response) => {
            const companies: any = response;
            return CompanyActions.loadCompaniesSuccess({ companies });
          }),
          catchError((error) => of(CompanyActions.addCompanyFailure({ error })))
        )
      )
    )
  );

  updateCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.updateCompany),
      mergeMap(({ company }) =>
        this.companyService.updateCompany(company).pipe(
          map((response) => {
            const companies: any = response;
            return CompanyActions.loadCompaniesSuccess({ companies });
          }),
          catchError((error) =>
            of(CompanyActions.updateCompanyFailure({ error }))
          )
        )
      )
    )
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.deleteCompany),
      mergeMap(({ id }) =>
        this.companyService.deleteCompany(id).pipe(
          map(() => CompanyActions.deleteCompanySuccess({ id })),
          catchError((error) =>
            of(CompanyActions.deleteCompanyFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}
}
