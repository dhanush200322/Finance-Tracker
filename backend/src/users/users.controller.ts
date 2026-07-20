import { Controller, Get, Put, Delete, Body, Req, UseGuards, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.id);
    if (user) delete (user as any).password;
    return user;
  }

  @Put('profile')
  async updateProfile(@Req() req, @Body() updateData: UpdateProfileDto) {
    if (updateData.email) {
      const existing = await this.usersService.findByEmail(updateData.email);
      if (existing && existing.id !== req.user.id) {
        throw new ConflictException('Email already in use');
      }
    }
    
    const user = await this.usersService.updateProfile(req.user.id, updateData);
    delete (user as any).password;
    return user;
  }

  @Delete('profile')
  async deleteProfile(@Req() req) {
    await this.usersService.delete(req.user.id);
    return { message: 'User deleted successfully' };
  }
}
