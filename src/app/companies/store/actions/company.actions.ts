import { createAction, props } from '@ngrx/store';
import { Company } from '../../interfaces/company.interface';

export enum CompanyActionTypes {
  LOAD_COMPANIES = '[Companies] Load Companies',
  LOAD_COMPANIES_SUCCESS = '[Companies] Load Companies Success',
  LOAD_COMPANIES_FAILURE = '[Companies] Load Companies Failure',
}

export const loadCompanies = createAction(CompanyActionTypes.LOAD_COMPANIES);
export const loadCompaniesSuccess = createAction(
  CompanyActionTypes.LOAD_COMPANIES_SUCCESS,
  props<{ companies: Company[] }>()
);
export const loadCompaniesFailure = createAction(
  CompanyActionTypes.LOAD_COMPANIES_FAILURE,
  props<{ error: any }>()
);
