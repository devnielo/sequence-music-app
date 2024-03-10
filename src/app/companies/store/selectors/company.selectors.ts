import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from '../reducers/company.reducers';

// Selector para obtener el feature state de las empresas
export const selectCompanyFeature =
  createFeatureSelector<CompanyState>('companies');

// Selector para obtener todas las empresas
export const selectAllCompanies = createSelector(
  selectCompanyFeature,
  (state: CompanyState) => state.companies
);

// Selector para obtener la información de carga
export const selectCompaniesLoading = createSelector(
  selectCompanyFeature,
  (state: CompanyState) => state.loading
);

// Selector para obtener una empresa específica por ID
export const selectCompanyById = (companyId: number) =>
  createSelector(selectCompanyFeature, (state: CompanyState) =>
    state.companies.find((company) => company.id === companyId)
  );

// Selector para obtener cualquier error relacionado con las empresas
export const selectCompaniesError = createSelector(
  selectCompanyFeature,
  (state: CompanyState) => state.error
);
