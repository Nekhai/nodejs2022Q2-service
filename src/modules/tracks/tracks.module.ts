import { Module } from '@nestjs/common';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/tracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
