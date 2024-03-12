import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../interfaces/artist.interface';
import { ApiService } from '../../core/services/api.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private apiService: ApiService) {}

  // Método para obtener todos los artistas
  getAllArtists(): Observable<ApiResponse<Artist[]>> {
    return this.apiService.get<Artist[]>('artists');
  }

  // Método para obtener un artista específico por su ID
  getArtistById(id: number): Observable<ApiResponse<Artist>> {
    console.log(id);

    return this.apiService.get<Artist>(`artists/${id}`);
  }

  // Método para añadir un nuevo artista
  addArtist(artist: Artist): Observable<ApiResponse<Artist>> {
    return this.apiService.post<Artist>('artists', artist);
  }

  // Método para actualizar un artista existente
  updateArtist(artist: Artist): Observable<ApiResponse<Artist>> {
    return this.apiService.put<Artist>(`artists/${artist.id}`, artist);
  }

  // Método para eliminar un artista
  deleteArtist(id: number): Observable<{}> {
    return this.apiService.delete<{}>(`artists/${id}`);
  }
}
