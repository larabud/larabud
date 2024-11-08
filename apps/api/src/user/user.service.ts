import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...user } = createUserDto;
        const hashedPassword = await hash(password);
        const createdUser = await this.prisma.user.create({
            data: {
                password: hashedPassword,
                ...user
            }
        })
        return createdUser
    }

    async findOne(userId: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id: userId }
        })
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }
}
