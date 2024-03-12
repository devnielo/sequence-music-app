import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, from, map, mergeMap } from 'rxjs';
import { Song } from '../interfaces/song.interface';
import { ApiService } from '../../core/services/api.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private apiService: ApiService) {}

  // Método para obtener todas las canciones
  getAllSongs(): Observable<ApiResponse<Song[]>> {
    return this.apiService.get<Song[]>('songs');
  }

  // Método para obtener una canción específica por su ID
  getSongById(id: number): Observable<ApiResponse<Song>> {
    return this.apiService.get<Song>(`songs/${id}`);
  }

  addSong(song: Omit<Song, 'id'>): Observable<ApiResponse<Song>> {
    // 'Omit<Song, 'id'>' significa que toma todos los campos de 'Song' excepto 'id'
    return this.apiService.post<Song>('songs', song);
  }

  // Método para actualizar una canción existente
  updateSong(song: Song): Observable<ApiResponse<Song>> {
    console.log(song.id);
    if (!song.id) {

      throw new Error('Song ID is required for update');
    }
    return this.apiService.put<Song>(`songs/${song.id}`, song);
  }

  // Método para eliminar una canción
  deleteSong(id: number): Observable<{}> {
    if (!id) {
      throw new Error('Song ID is required for update');
    }
    return this.apiService.delete<{}>(`songs/${id}`);
  }

  // Metodo buscar canciones
  searchSongs(query: string): Observable<Song[]> {
    return from(
      this.apiService.get<ApiResponse<Song[]>>(`songs?q=${query}`).pipe(
        mergeMap(async (response) => {
          try {
            const results: any = response;
            return results;
          } catch (error) {
            throw error;
          }
        })
      )
    );
  }
}
