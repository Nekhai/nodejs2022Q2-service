import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { db } from 'src/db.storage';
import { Artist } from '../interfaces/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistdDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  getArtists(): Artist[] {
    return db.artists;
  }

  getArtist(id: string) {
    if (validate(id)) {
      return db.artists.find((artist) => artist.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  createArtist(body: CreateArtistDto) {
    const addArtists = db.artists.push({
      id: uuidv4(),
      ...body,
    });

    return db.artists[addArtists - 1];
  }

  updateArtist(body: UpdateArtistdDto, id: string) {
    if (validate(id)) {
      const trackIndex = db.artists.findIndex((artist) => artist.id === id);

      if (trackIndex === -1)
        throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);

      const currentArtist = db.artists[trackIndex];
      const updatedArtists = Object.assign(currentArtist, body);

      db.artists[trackIndex] = updatedArtists;

      return updatedArtists;
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeArtist(id: string) {
    if (validate(id)) {
      const artistIndex: number = db.artists.findIndex(
        (artist) => artist.id === id,
      );

      if (artistIndex === -1)
        throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);

      db.artists.splice(artistIndex, 1);

      db.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }
}
