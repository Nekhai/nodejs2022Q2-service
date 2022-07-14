import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddAlbumDto {
  @IsNotEmpty()
  @IsUUID()
  albums: string;
}
