import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  async findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }



  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
