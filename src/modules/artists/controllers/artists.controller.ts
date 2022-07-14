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
  getArtists(): Artist[] {
    return this.artistsServices.getArtists();
  }

  @Get(':id')
  getOne(@Param('id') artistId: string): Artist {
    return this.artistsServices.getArtist(artistId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsServices.createArtist(createArtistDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Body() updateArtistdDto: UpdateArtistdDto,
    @Param('id') artistId: string,
  ) {
    return this.artistsServices.updateArtist(updateArtistdDto, artistId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') artistId: string) {
    return this.artistsServices.removeArtist(artistId);
  }
}
