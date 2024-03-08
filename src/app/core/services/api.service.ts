// src/app/core/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/'; // TODO: create .env

  constructor(private http: HttpClient) {}

  // Método genérico para realizar peticiones GET
  get<T>(endpoint: string, params?: HttpParams | {[param: string]: string | string[]}): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.baseUrl + endpoint, { params });
  }

  // Método genérico para realizar peticiones POST
  post<T>(endpoint: string, data: T): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.baseUrl + endpoint, data);
  }

  // Método genérico para realizar peticiones PUT
  put<T>(endpoint: string, data: T): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(this.baseUrl + endpoint, data);
  }

  // Método genérico para realizar peticiones DELETE
  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(this.baseUrl + endpoint);
  }
}
