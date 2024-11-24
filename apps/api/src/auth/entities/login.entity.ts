import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginEntity {
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