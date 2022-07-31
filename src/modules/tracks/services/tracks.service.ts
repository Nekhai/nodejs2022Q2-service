import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { Track } from '../interfaces/tracks.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackdDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/tracks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getTrack(trackId: string): Promise<Track> {
    if (!validate(trackId)) throw new BadRequestException('Invalid Id');

    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!track) throw new NotFoundException("User doesn't exist");

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const addTrack = this.trackRepository.create({
      id: uuidv4(),
      ...createTrackDto,
    });

    return await this.trackRepository.save(addTrack);
  }

  async updateTrack(
    updateTrackdDto: UpdateTrackdDto,
    trackId: string,
  ): Promise<Track> {
    if (!validate(trackId)) throw new BadRequestException('Invalid Id');

    const updateTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!updateTrack) throw new NotFoundException("Track doesn't exist");

    // const currentTrack = db.tracks[trackIndex];
    const updatedTrack = Object.assign(updateTrack, updateTrackdDto);

    // db.tracks[trackIndex] = updatedTrack;

    return await this.trackRepository.save(updatedTrack);
  }

  async removeTrack(trackId: string): Promise<void> {
    if (!validate(trackId)) throw new BadRequestException('Invalid Id');

    const result = await this.trackRepository.delete(trackId);

    if (result.affected === 0) {
      throw new NotFoundException("Track doesn't exist");
    }
  }
  // updateTrack(body: UpdateTrackdDto, id: string): Promise<Track> {
  //   if (!validate(id)) throw new BadRequestException('Invalid Id');
  //     const trackIndex = db.tracks.findIndex((track) => track.id === id);

  //     if (trackIndex === -1)
  //       throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

  //     const currentTrack = db.tracks[trackIndex];
  //     const updatedTrack = Object.assign(currentTrack, body);

  //     db.tracks[trackIndex] = updatedTrack;

  //     return updatedTrack;
  // }

  // async removeTrack(id: string): Promise<void> {
  //   if (!validate(id)) throw new BadRequestException('Invalid Id');

  //     const trackIndex: number = db.tracks.findIndex(
  //       (track) => track.id === id,
  //     );

  //     if (trackIndex === -1)
  //       throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

  //     db.tracks.splice(trackIndex, 1);
  // }
}
