import { Album } from 'src/modules/albums/interfaces/albums.interface';
import { Track } from 'src/modules/tracks/interfaces/tracks.interface';
import { Artist } from 'src/modules/artists/interfaces/artists.interface';
export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
