import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('AUTHENTIFICATION')
@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService
        , private authService: AuthService) { }

    @ApiOperation ({ summary: 'Connexion à un compte utilisateur' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        const user = await this.usersService.findOneByCp(signInDto.cp.toUpperCase())
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if (!user.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
        const isMatch = await bcrypt.compare(signInDto.password, user.password)
        if (!isMatch) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
        return this.authService.signIn(signInDto.cp, user.id);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
