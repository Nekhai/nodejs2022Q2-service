import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';

export class UpdateTrackdDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsOptional()
  @IsNumber()
  duration: number;
}
