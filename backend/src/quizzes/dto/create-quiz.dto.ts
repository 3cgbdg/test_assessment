import { IsString, IsArray, ValidateNested, IsNotEmpty, IsIn, IsBoolean, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsIn(['boolean', 'input', 'checkbox'])
  type: 'boolean' | 'input' | 'checkbox';

  answer: boolean | string | string[];
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  quizTitle: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}