import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid email or password');

        return user;
    }
}
