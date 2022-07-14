import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { db } from 'src/db.storage';
import { Album } from '../interfaces/albums.interface';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';

@Injectable()
export class AlbumsService {
  getAlbums(): Album[] {
    return db.albums;
  }

  getAlbum(id: string) {
    if (validate(id)) {
      return db.albums.find((album) => album.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  createAlbum(body: CreateAlbumDto) {
    const addAlbum = db.albums.push({
      id: uuidv4(),
      ...body,
    });

    return db.albums[addAlbum - 1];
  }

  updateAlbum(body: UpdateAlbumDto, id: string) {
    if (validate(id)) {
      const albumIndex = db.albums.findIndex((album) => album.id === id);

      if (albumIndex === -1)
        throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

      const currentAlbum = db.albums[albumIndex];
      const updatedAlbum = Object.assign(currentAlbum, body);

      db.albums[albumIndex] = updatedAlbum;

      return updatedAlbum;
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeAlbum(id: string) {
    if (validate(id)) {
      const albumIndex: number = db.albums.findIndex(
        (album) => album.id === id,
      );

      if (albumIndex === -1)
        throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

      db.albums.splice(albumIndex, 1);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }
}
