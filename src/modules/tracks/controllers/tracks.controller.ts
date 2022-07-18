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
    const track = this.tracksService.getTrack(trackId);

    if (track) return track;
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
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
    const track = this.tracksService.updateTrack(updateTrackdDto, trackId);

    if (track) return track;
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') trackId: string) {
    return this.tracksService.removeTrack(trackId);
  }
}
