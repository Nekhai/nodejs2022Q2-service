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
  HttpException,
  HttpStatus,
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
    const artist = this.artistsServices.getArtist(artistId);

    if (artist) return artist;
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
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
    const artist = this.artistsServices.updateArtist(
      updateArtistdDto,
      artistId,
    );

    if (artist) return artist;
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') artistId: string) {
    return this.artistsServices.removeArtist(artistId);
  }
}
