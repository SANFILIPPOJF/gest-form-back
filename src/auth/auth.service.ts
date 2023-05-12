import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService
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
}
