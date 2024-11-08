import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";
import { JwtPayload } from "../types/payload";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor(
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private authService: AuthService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshTokenConfig.secret,
            ignoreExpiration: false
        })
    }

    validate(payload: JwtPayload) {
        const userId = payload.sub;
        return this.authService.validateRefreshToken(userId)
    }
}