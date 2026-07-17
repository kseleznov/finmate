import { Body, Controller, Get, Patch, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { setUserCookie } from '../auth/auth.cookies';
import { UsersService } from './users.service';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdatePaydayDto } from './dto/update-payday.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getById(user.userId);
  }

  @Patch('me')
  async updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() updateUsernameDto: UpdateUsernameDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const updated = await this.usersService.updateUsername(
      user.userId,
      updateUsernameDto.username,
    );
    setUserCookie(res, updated);
    return updated;
  }

  @Patch('me/payday')
  async updatePayday(
    @CurrentUser() user: AuthenticatedUser,
    @Body() updatePaydayDto: UpdatePaydayDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const updated = await this.usersService.updatePayday(
      user.userId,
      updatePaydayDto.payday,
    );
    setUserCookie(res, updated);
    return updated;
  }
}
