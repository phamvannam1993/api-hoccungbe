import { PartialType } from '@nestjs/mapped-types';
import { CreateMiniGameDto } from './create-mini-game.dto';

export class UpdateMiniGameDto extends PartialType(CreateMiniGameDto) {}
