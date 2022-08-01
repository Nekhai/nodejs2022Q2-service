import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { Album } from '../interfaces/albums.interface';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { AlbumEntity } from '../entities/albums.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getAlbum(albumId: string): Promise<Album> {
    if (!validate(albumId)) throw new BadRequestException('Invalid Id');

    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) throw new NotFoundException("User doesn't exist");

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const addAlbum = this.albumRepository.create({
      id: uuidv4(),
      ...createAlbumDto,
    });

    return await this.albumRepository.save(addAlbum);
  }

  async updateAlbum(
    updateAlbumDto: UpdateAlbumDto,
    albumId: string,
  ): Promise<Album> {
    if (!validate(albumId)) throw new BadRequestException('Invalid Id');

    const updateAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!updateAlbum) throw new NotFoundException("Track doesn't exist");

    const updatedTrack = Object.assign(updateAlbum, updateAlbumDto);

    return await this.albumRepository.save(updateAlbum);
  }

  async removeAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('Invalid Id');

    const result = await this.albumRepository.delete(albumId);

    if (result.affected === 0) {
      throw new NotFoundException("Track doesn't exist");
    }
  }
}
