import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateArtistdDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
