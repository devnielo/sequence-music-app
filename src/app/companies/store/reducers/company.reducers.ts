import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from '../actions/company.actions';
import { Company } from '../../interfaces/company.interface';

export interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: any;
}

export const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null
};

export const companyReducer = createReducer(
  initialState,
  on(CompanyActions.loadCompanies, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CompanyActions.loadCompaniesSuccess, (state, { companies }) => ({
    ...state,
    loading: false,
    companies,
    error: null
  })),
  on(CompanyActions.loadCompaniesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
