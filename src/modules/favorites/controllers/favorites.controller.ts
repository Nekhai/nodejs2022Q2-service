import {
  Controller,
  Get,
  Post,
  HttpCode,
  UsePipes,
  Body,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesRepsonse } from '../interfaces/favoritesRepsonse';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): FavoritesRepsonse {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  addTrack(@Param('id') trackId: string) {
    return this.favoritesService.addTrack(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') trackId: string) {
    return this.favoritesService.removeTrack(trackId);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') albumId: string) {
    return this.favoritesService.addAlbum(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') albumId: string) {
    return this.favoritesService.removeAlbum(albumId);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') artistId: string) {
    return this.favoritesService.addArtist(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') artistId: string) {
    return this.favoritesService.removeArtist(artistId);
  }
}
