import { Injectable } from '@nestjs/common';
import { CreateQuizDto, } from './dto/create-quiz.dto';
import { PrismaService } from 'prisma/prisma.service';

// mapper for type of question 
const typeMap = {
  boolean: 'BOOLEAN' as const,
  input: 'INPUT' as const,
  checkbox: 'CHECKBOX' as const
};

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) { };
  async create(dto: CreateQuizDto) {
    // creating quiz
    return await this.prisma.quiz.create({
      data: {
        title: dto.quizTitle,
        questions: {
          create: dto.questions.map(q => ({
            text: q.text,
            type: typeMap[q.type],
            answer: q.answer,
          })),
        }
      },
    })
  }


  async findAll() {
    // getting all quizzes
    const quizzes = await this.prisma.quiz.findMany({ include: { questions: true } });
    return quizzes;
  }

  async findOne(id: string) {
    // getting quiz by id 
    const quiz = await this.prisma.quiz.findUnique({ where: { id: id }, include: { questions: true } });
    return quiz;
  }



  async remove(id: string) {
    // removing quiz byid
    const removedQuiz = await this.prisma.quiz.delete({ where: { id: id } });
    return { message: 'Quiz was successfully removed!' };
  }
}
