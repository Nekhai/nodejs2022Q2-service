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
import { TracksService } from '../services/tracks.service';
import { Track } from '../interfaces/tracks.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackdDto } from '../dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getTracks(): Track[] {
    return this.tracksService.getTracks();
  }

  @Get(':id')
  getOne(@Param('id') trackId: string): Track {
    return this.tracksService.getTrack(trackId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateTrackDto) {
    return this.tracksService.createTrack(createUserDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Body() updateTrackdDto: UpdateTrackdDto,
    @Param('id') trackId: string,
  ) {
    return this.tracksService.updateTrack(updateTrackdDto, trackId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') trackId: string) {
    return this.tracksService.removeTrack(trackId);
  }
}
