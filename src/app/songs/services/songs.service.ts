import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../interfaces/song.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private apiService: ApiService) {}

  getSongs(): Observable<ApiResponse<Song[]>> {
    return this.apiService.get<Song[]>('songs');
  }

  // Otros métodos utilizando apiService...
}
