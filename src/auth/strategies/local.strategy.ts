import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authSevice: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string) {
        const userTokenObject = await this.authSevice.validateUser({ email, password })

        if (!userTokenObject) throw new UnauthorizedException()

        return userTokenObject
    }
}