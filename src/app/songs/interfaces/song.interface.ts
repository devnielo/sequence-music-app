import { Artist } from "src/app/artists/interfaces/artist.interface";
import { Company } from "src/app/companies/interfaces/company.interface";

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
  companyDetails?: Company[];
  artistDetails?: Artist[];

}

export interface SongWithArtists extends Song {
  artistNames: string;
}
