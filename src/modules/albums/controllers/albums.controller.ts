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
import { AlbumsService } from '../services/albums.service';
import { Album } from '../interfaces/albums.interface';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAlbums(): Album[] {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  getOne(@Param('id') albumId: string): Album {
    const album = this.albumsService.getAlbum(albumId);

    if (album) return album;
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Body() updateAlbumdDto: UpdateAlbumDto,
    @Param('id') albumId: string,
  ) {
    const album = this.albumsService.updateAlbum(updateAlbumdDto, albumId);

    if (album) return album;
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') albumId: string) {
    return this.albumsService.removeAlbum(albumId);
  }
}
