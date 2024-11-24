import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
    @ApiProperty({
        example: 'johndoe@example.com',
        description: 'Email address of the user',
        required: true,
    })
    email: string;

    @ApiProperty({
        example: 'mypassword',
        description: 'Password of the user',
        required: true,
    })
    password: string;
}
