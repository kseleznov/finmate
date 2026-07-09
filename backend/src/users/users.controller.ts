import { Body, Controller, Patch } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdatePaydayDto } from './dto/update-payday.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('me')
  updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() updateUsernameDto: UpdateUsernameDto,
  ) {
    return this.usersService.updateUsername(
      user.userId,
      updateUsernameDto.username,
    );
  }

  @Patch('me/payday')
  updatePayday(
    @CurrentUser() user: AuthenticatedUser,
    @Body() updatePaydayDto: UpdatePaydayDto,
  ) {
    return this.usersService.updatePayday(user.userId, updatePaydayDto.payday);
  }
}
