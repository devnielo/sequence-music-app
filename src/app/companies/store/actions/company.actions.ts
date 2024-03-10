import { createAction, props } from '@ngrx/store';
import { Company } from '../../interfaces/company.interface';

export enum CompanyActionTypes {
  LOAD_COMPANIES = '[Companies] Load Companies',
  LOAD_COMPANIES_SUCCESS = '[Companies] Load Companies Success',
  LOAD_COMPANIES_FAILURE = '[Companies] Load Companies Failure',
  LOAD_COMPANY = '[Company] Load Company',
  LOAD_COMPANY_SUCCESS = '[Company] Load Company Success',
  LOAD_COMPANY_FAILURE = '[Company] Load Company Failure',
  ADD_COMPANY = '[Company] Add Company',
  ADD_COMPANY_SUCCESS = '[Company] Add Company Success',
  ADD_COMPANY_FAILURE = '[Company] Add Company Failure',
  UPDATE_COMPANY = '[Company] Update Company',
  UPDATE_COMPANY_SUCCESS = '[Company] Update Company Success',
  UPDATE_COMPANY_FAILURE = '[Company] Update Company Failure',
  DELETE_COMPANY = '[Company] Delete Company',
  DELETE_COMPANY_SUCCESS = '[Company] Delete Company Success',
  DELETE_COMPANY_FAILURE = '[Company] Delete Company Failure'
}

// Acciones para cargar todas las empresas
export const loadCompanies = createAction(
  CompanyActionTypes.LOAD_COMPANIES
);

export const loadCompaniesSuccess = createAction(
  CompanyActionTypes.LOAD_COMPANIES_SUCCESS,
  props<{ companies: Company[] }>()
);

export const loadCompaniesFailure = createAction(
  CompanyActionTypes.LOAD_COMPANIES_FAILURE,
  props<{ error: any }>()
);

// Acciones para cargar una empresa específica
export const loadCompany = createAction(
  CompanyActionTypes.LOAD_COMPANY,
  props<{ id: number }>()
);

export const loadCompanySuccess = createAction(
  CompanyActionTypes.LOAD_COMPANY_SUCCESS,
  props<{ company: Company }>()
);

export const loadCompanyFailure = createAction(
  CompanyActionTypes.LOAD_COMPANY_FAILURE,
  props<{ error: any }>()
);

// Acciones para agregar una empresa
export const addCompany = createAction(
  CompanyActionTypes.ADD_COMPANY,
  props<{ company: Company }>()
);

export const addCompanySuccess = createAction(
  CompanyActionTypes.ADD_COMPANY_SUCCESS,
  props<{ company: Company }>()
);

export const addCompanyFailure = createAction(
  CompanyActionTypes.ADD_COMPANY_FAILURE,
  props<{ error: any }>()
);

// Acciones para actualizar una empresa
export const updateCompany = createAction(
  CompanyActionTypes.UPDATE_COMPANY,
  props<{ company: Company }>()
);

export const updateCompanySuccess = createAction(
  CompanyActionTypes.UPDATE_COMPANY_SUCCESS,
  props<{ company: Company }>()
);

export const updateCompanyFailure = createAction(
  CompanyActionTypes.UPDATE_COMPANY_FAILURE,
  props<{ error: any }>()
);

// Acciones para eliminar una empresa
export const deleteCompany = createAction(
  CompanyActionTypes.DELETE_COMPANY,
  props<{ id: number }>()
);

export const deleteCompanySuccess = createAction(
  CompanyActionTypes.DELETE_COMPANY_SUCCESS,
  props<{ id: number }>()
);

export const deleteCompanyFailure = createAction(
  CompanyActionTypes.DELETE_COMPANY_FAILURE,
  props<{ error: any }>()
);
