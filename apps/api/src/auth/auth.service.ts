import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './types/payload';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedJWTUser, AuthenticatedUser, AuthTokens } from './types/auth';
import { verify } from 'argon2'
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>
    ) { }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.findOneByEmail(createUserDto.email);
        if (user) {
            throw new ConflictException("User already exists!")
        }
        return await this.userService.create(createUserDto)
    }

    async login(id: number, name?: string): Promise<AuthenticatedJWTUser> {
        const { accessToken, refreshToken } = await this.generateTokens(id)
        return {
            id,
            name,
            accessToken,
            refreshToken
        }
    }

    async validateUser(email: string, password: string): Promise<AuthenticatedUser> {
        const user = await this.userService.findOneByEmail(email)
        if (!user) {
            throw new UnauthorizedException("User not found!");
        }

        const isPasswordMatched = verify(user.password, password);
        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid Credentials!");
        }

        return { id: user.id, name: user.name }
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId)
        if (!user) throw new UnauthorizedException("User not found!")
        const currentUser = { id: user.id }

        return currentUser
    }

    async generateTokens(userId: number): Promise<AuthTokens> {
        const payload: JwtPayload = { sub: userId }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])
        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(userId: number, name: string): Promise<AuthenticatedJWTUser> {
        const { accessToken, refreshToken } = await this.generateTokens(userId)
        return {
            id: userId,
            name: name,
            accessToken,
            refreshToken
        }
    }

    async validateRefreshToken(userId: number) {
        const user = await this.userService.findOne(userId)
        if (!user) throw new UnauthorizedException("User not found!")
        const currentUser = { id: user.id }
        return currentUser
    }
}
