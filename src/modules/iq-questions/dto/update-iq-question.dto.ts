import { PartialType } from '@nestjs/swagger';
import { CreateIqQuestionDto } from './create-iq-question.dto';

export class UpdateIqQuestionDto extends PartialType(CreateIqQuestionDto) {}
