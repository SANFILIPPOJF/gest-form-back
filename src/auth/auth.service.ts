import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(cp: string, id: number): Promise<any> {
        const payload = { cp: cp, id: id };
        return {
            timestamp: new Date().toISOString(),
            statusCode: 200,
            data : {
                access_token: await this.jwtService.signAsync(payload)
            }
        };
    }
    async validateUser(cp: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByCp(cp);
        const encodePassword = await bcrypt.compare(password, user.password)//comparer password hashe avec celui du user
        
        if (user && encodePassword) {// remplacer user.password avec le nom de la const de hashage
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
