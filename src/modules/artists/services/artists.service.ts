import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { Artist } from '../interfaces/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistdDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artists.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getArtist(artistId: string): Promise<Artist> {
    if (!validate(artistId)) throw new BadRequestException('Invalid Id');

    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) throw new NotFoundException("User doesn't exist");

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const addArtist = this.artistRepository.create({
      id: uuidv4(),
      ...createArtistDto,
    });

    return await this.artistRepository.save(addArtist);
  }

  async updateArtist(
    updateArtistdDto: UpdateArtistdDto,
    artistId: string,
  ): Promise<Artist> {
    if (!validate(artistId)) throw new BadRequestException('Invalid Id');

    const updateArtist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!updateArtist) throw new NotFoundException("Track doesn't exist");

    const updatedArtist = Object.assign(updateArtist, updateArtistdDto);

    return await this.artistRepository.save(updatedArtist);
  }

  async removeArtist(artistId: string): Promise<void> {
    if (!validate(artistId)) throw new BadRequestException('Invalid Id');

    const result = await this.artistRepository.delete(artistId);

    if (result.affected === 0) {
      throw new NotFoundException("Track doesn't exist");
    }
  }
}
