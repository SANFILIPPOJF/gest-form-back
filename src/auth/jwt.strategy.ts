import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      usernameField: 'cp',
      passwordField: 'password'
    });
  }

  async validate(cp: string, password: string) {
    const user = await this.authService.validateUser(cp, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}