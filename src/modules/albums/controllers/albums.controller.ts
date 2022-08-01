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
import { AlbumsService } from '../services/albums.service';
import { Album } from '../interfaces/albums.interface';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  async getOne(@Param('id') albumId: string): Promise<Album> {
    return await this.albumsService.getAlbum(albumId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateAlbumdDto: UpdateAlbumDto,
    @Param('id') albumId: string,
  ): Promise<Album> {
    return await this.albumsService.updateAlbum(updateAlbumdDto, albumId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') albumId: string): Promise<void> {
    return await this.albumsService.removeAlbum(albumId);
  }
}
