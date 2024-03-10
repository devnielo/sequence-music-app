import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from '../actions/company.actions';
import { Company } from '../../interfaces/company.interface';

export interface CompanyState {
  companies: Company[];
  currentCompany: Company | null;
  loading: boolean;
  error: any;
}

export const initialState: CompanyState = {
  companies: [],
  currentCompany: null,
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
  })),
  on(CompanyActions.addCompany, state => ({
    ...state,
    loading: true
  })),
  on(CompanyActions.addCompanySuccess, (state, { company }) => ({
    ...state,
    companies: [...state.companies, company],
    loading: false
  })),
  on(CompanyActions.addCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CompanyActions.updateCompany, state => ({
    ...state,
    loading: true
  })),
  on(CompanyActions.updateCompanySuccess, (state, { company }) => ({
    ...state,
    companies: state.companies.map(c => c.id === company.id ? company : c),
    loading: false
  })),
  on(CompanyActions.updateCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CompanyActions.deleteCompany, state => ({
    ...state,
    loading: true
  })),
  on(CompanyActions.deleteCompanySuccess, (state, { id }) => ({
    ...state,
    companies: state.companies.filter(c => c.id !== id),
    loading: false
  })),
  on(CompanyActions.deleteCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
