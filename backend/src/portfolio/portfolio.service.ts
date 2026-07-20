import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(userId: string) {
    const aggregations = await this.prisma.investment.aggregate({
      where: { userId },
      _sum: {
        investedAmount: true,
        currentValue: true,
      },
    });

    const totalInvested = Number(aggregations._sum.investedAmount || 0);
    const currentValue = Number(aggregations._sum.currentValue || 0);

    const profit = currentValue - totalInvested;
    const profitPercentage = totalInvested > 0 ? Number(((profit / totalInvested) * 100).toFixed(2)) : 0;

    return {
      totalInvested,
      currentValue,
      profit,
      profitPercentage,
    };
  }
}
