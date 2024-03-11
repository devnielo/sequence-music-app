export interface Song {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  country: string | undefined;
  duration: number;
  rating: number;
  artist: number | number[];
}
