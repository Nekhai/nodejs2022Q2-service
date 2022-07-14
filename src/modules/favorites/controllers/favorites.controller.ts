import {
  Controller,
  Get,
  Post,
  HttpCode,
  UsePipes,
  Body,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { AddTrackDto } from '../dto/add-track.dto';
import { FavoritesRepsonse } from '../interfaces/favoritesRepsonse';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
}
