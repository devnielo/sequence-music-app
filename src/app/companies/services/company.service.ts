import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { Company } from '../interfaces/company.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private apiService: ApiService) {}

  getCompanies(): Observable<ApiResponse<Company[]>> {
    return this.apiService.get<Company[]>('companies');
  }

}
