import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddTrackDto {
  @IsNotEmpty()
  @IsUUID()
  tracks: string;
}
