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
  async getTracks(): Promise<Track[]> {
    return await this.tracksService.getTracks();
  }

  @Get(':id')
  async getOne(@Param('id') trackId: string): Promise<Track> {
    return await this.tracksService.getTrack(trackId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.createTrack(createUserDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateTrackdDto: UpdateTrackdDto,
    @Param('id') trackId: string,
  ): Promise<Track> {
    return await this.tracksService.updateTrack(updateTrackdDto, trackId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') trackId: string): Promise<void> {
    return await this.tracksService.removeTrack(trackId);
  }
}
