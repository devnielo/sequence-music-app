import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';
import { ApiService } from '../../core/services/api.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private apiService: ApiService) {}

  // Método para obtener todas las empresas
  getAllCompanies(): Observable<ApiResponse<Company[]>> {
    return this.apiService.get<Company[]>('companies');
  }

  // Método para obtener una empresa específica por su ID
  getCompanyById(id: number): Observable<ApiResponse<Company>> {
    return this.apiService.get<Company>(`companies/${id}`);
  }

  // Método para añadir una nueva empresa
  addCompany(company: Company): Observable<ApiResponse<Company>> {
    return this.apiService.post<Company>('companies', company);
  }

  // Método para actualizar una empresa existente
  updateCompany(company: Company): Observable<ApiResponse<Company>> {
    return this.apiService.put<Company>(`companies/${company.id}`, company);
  }

  // Método para eliminar una empresa
  deleteCompany(id: number): Observable<{}> {
    return this.apiService.delete<{}>(`companies/${id}`);
  }
}
