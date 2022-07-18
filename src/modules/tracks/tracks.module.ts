import { Module } from '@nestjs/common';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
