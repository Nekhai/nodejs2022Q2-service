import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';
import { db } from 'src/db.storage';
import { Track } from 'src/modules/tracks/interfaces/tracks.interface';
import { Album } from 'src/modules/albums/interfaces/albums.interface';
import { Artist } from 'src/modules/artists/interfaces/artists.interface';
import { FavoritesRepsonse } from '../interfaces/favoritesRepsonse';

@Injectable()
export class FavoritesService {
  getFavorites(): FavoritesRepsonse {
    // const tracks = db.favorites.tracks.reduce((acc: any, trackId: string) => {
    //   const findTrack = db.tracks.find((artist) => artist.id === trackId);

    //   if (findTrack) {
    //     acc.push(findTrack);
    //     return acc;
    //   }
    // }, []);
    // const albums = db.favorites.albums.reduce((acc: any, trackId: string) => {
    //   const findTrack = db.albums.find((artist) => artist.id === trackId);

    //   if (findTrack) {
    //     acc.push(findTrack);
    //     return acc;
    //   }
    // }, []);
    // const artists = db.favorites.artists.reduce((acc: any, trackId: string) => {
    //   const findTrack = db.artists.find((artist) => artist.id === trackId);

    //   if (findTrack) {
    //     acc.push(findTrack);
    //     return acc;
    //   }
    // }, []);
    const tracks = db.favorites.tracks.map((trackId) =>
      db.tracks.find((track) => track.id === trackId),
    );
    const albums = db.favorites.albums.map((albumId) =>
      db.albums.find((album) => album.id === albumId),
    );
    const artists = db.favorites.artists.map((artistId) =>
      db.artists.find((artist) => artist.id === artistId),
    );

    return {
      tracks: tracks.filter((item) => {
        return item !== null && item !== undefined;
      }),
      albums: albums.filter((item) => {
        return item !== null && item !== undefined;
      }),
      artists: artists.filter((item) => {
        return item !== null && item !== undefined;
      }),
    };
  }

  addTrack(id: string): Track {
    if (validate(id)) {
      if (db.favorites.tracks.indexOf(id) === -1) {
        db.favorites.tracks.push(id);
      }

      return db.tracks.find((track) => track.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeTrack(id: string) {
    if (validate(id)) {
      const trackIndex = db.favorites.tracks.indexOf(id);

      if (trackIndex !== -1) {
        db.favorites.tracks.splice(trackIndex, 1);
        console.log(db.favorites.tracks);
      } else {
        throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
      }
    }
  }

  addAlbum(id: string): Album {
    if (validate(id)) {
      db.favorites.albums.push(id);

      if (!db.albums.find((album) => album.id === id)) {
        throw new HttpException(
          'Entity absence',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return db.albums.find((album) => album.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeAlbum(id: string) {
    if (validate(id)) {
      const albumIndex = db.favorites.albums.indexOf(id);

      if (albumIndex !== -1) {
        db.favorites.albums.splice(albumIndex, 1);
      }
    }
  }

  addArtist(id: string): Artist {
    if (validate(id)) {
      db.favorites.artists.push(id);

      if (!db.artists.find((artist) => artist.id === id)) {
        throw new HttpException(
          'Entity absence',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return db.artists.find((artist) => artist.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeArtist(id: string) {
    if (validate(id)) {
      const artistIndex = db.favorites.artists.indexOf(id);

      if (artistIndex !== -1) {
        db.favorites.artists.splice(artistIndex, 1);
      }
    }
  }
}
