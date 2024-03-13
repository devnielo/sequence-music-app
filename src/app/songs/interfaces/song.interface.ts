export interface Song {
  id?: number;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  country: string | undefined;
  duration: number;
  rating: number;
  artist: number | number[];
}

export interface SongWithArtists extends Song {
  artistNames: string;
}
