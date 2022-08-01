import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from '../services/artists.service';
import { Artist } from '../interfaces/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistdDto } from '../dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsServices: ArtistsService) {}

  @Get()
  async getArtists(): Promise<Artist[]> {
    return await this.artistsServices.getArtists();
  }

  @Get(':id')
  async getOne(@Param('id') artistId: string): Promise<Artist> {
    return await this.artistsServices.getArtist(artistId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsServices.createArtist(createArtistDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateArtistdDto: UpdateArtistdDto,
    @Param('id') artistId: string,
  ): Promise<Artist> {
    return await this.artistsServices.updateArtist(updateArtistdDto, artistId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') artistId: string): Promise<void> {
    return await this.artistsServices.removeArtist(artistId);
  }
}
