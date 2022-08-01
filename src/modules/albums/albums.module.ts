import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/albums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
