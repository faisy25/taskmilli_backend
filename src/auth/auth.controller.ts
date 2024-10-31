import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() userData: { name: string; username: string; password: string },
  ) {
    return this.userService.createUser(userData);
  }

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginData.username,
      loginData.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
