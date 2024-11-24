import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserEntity implements User {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 0
    })
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "John Doe"
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: "johndoe@example.com"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}