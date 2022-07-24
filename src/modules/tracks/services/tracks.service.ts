import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { db } from 'src/db.storage';
import { Track } from '../interfaces/tracks.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackdDto } from '../dto/update-track.dto';

@Injectable()
export class TracksService {
  getTracks(): Track[] {
    return db.tracks;
  }

  getTrack(id: string) {
    if (validate(id)) {
      return db.tracks.find((track) => track.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  createTrack(body: CreateTrackDto) {
    const addTrack = db.tracks.push({
      id: uuidv4(),
      ...body,
    });

    return db.tracks[addTrack - 1];
  }

  updateTrack(body: UpdateTrackdDto, id: string) {
    if (validate(id)) {
      const trackIndex = db.tracks.findIndex((track) => track.id === id);

      if (trackIndex === -1)
        throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

      const currentTrack = db.tracks[trackIndex];
      const updatedTrack = Object.assign(currentTrack, body);

      db.tracks[trackIndex] = updatedTrack;

      return updatedTrack;
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeTrack(id: string) {
    if (validate(id)) {
      const trackIndex: number = db.tracks.findIndex(
        (track) => track.id === id,
      );

      if (trackIndex === -1)
        throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

      db.tracks.splice(trackIndex, 1);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }
}
