import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
