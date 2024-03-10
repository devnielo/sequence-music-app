import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from '../reducers/company.reducers';

export const selectCompanyFeature = createFeatureSelector<CompanyState>('companies');

export const selectAllCompanies = createSelector(
  selectCompanyFeature,
  (state: CompanyState) => state.companies
);

export const selectCompaniesLoading = createSelector(
  selectCompanyFeature,
  (state: CompanyState) => state.loading
);
