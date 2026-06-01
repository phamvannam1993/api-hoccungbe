import { IsArray, IsInt } from 'class-validator';

export class ReorderMiniGamesDto {
  @IsArray()
  @IsInt({ each: true })
  ids: number[];
}
