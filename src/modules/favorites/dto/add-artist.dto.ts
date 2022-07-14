import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddArtistDto {
  @IsNotEmpty()
  @IsUUID()
  artists: string;
}
