export interface Song {
  id:       number;
  title:    string;
  poster:   string;
  genres:    string[];
  year:     number;
  duration: number;
  rating:   number;
  artist: number | number[];
}
