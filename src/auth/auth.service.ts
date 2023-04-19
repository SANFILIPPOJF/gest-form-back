import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService
    ) { }

    async signIn(cp: string, id: number): Promise<any> {

        const payload = { cp: cp, id: id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
