import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }
    async create(createUserDto: RegisterUserDto) {
        const { password, ...user } = createUserDto;
        const hashedPassword = await hash(password);
        return await this.prisma.users.create({
            data: {
                password: hashedPassword,
                ...user
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.users.findUnique({
            where: {
                email,
            }
        })
    }

    async findOne(userId: number) {
        return await this.prisma.users.findUnique({
            where: {
                id: userId,
            }
        })
    }

    async findAll() {
        return await this.prisma.users.findMany()
    }
}
