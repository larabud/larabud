import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator"
export class CreateUserDto {
    @IsString()
    @ApiProperty({ example: 'johndoe', description: 'The name of the user' })
    name: string;

    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'johndoe@example.com', description: 'The email of the user' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'mypassword', description: 'The password of the user' })
    password: string;

}