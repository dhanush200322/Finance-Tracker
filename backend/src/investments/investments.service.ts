import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createInvestmentDto: CreateInvestmentDto) {
    return this.prisma.investment.create({
      data: {
        userId,
        ...createInvestmentDto,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.investment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const investment = await this.prisma.investment.findUnique({
      where: { id },
    });

    if (!investment || investment.userId !== userId) {
      throw new NotFoundException('Investment not found');
    }

    return investment;
  }

  async update(userId: string, id: string, updateInvestmentDto: UpdateInvestmentDto) {
    await this.findOne(userId, id); // Ensure it exists and belongs to user

    return this.prisma.investment.update({
      where: { id },
      data: updateInvestmentDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Ensure it exists and belongs to user

    await this.prisma.investment.delete({
      where: { id },
    });

    return { message: 'Investment successfully deleted' };
  }
}
