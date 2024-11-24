import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
    @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
    id: number;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token',
    })
    accessToken: string;

    @ApiProperty({
        example: 'dGhpc2lzbXlyZWZyZXNoVG9rZW4...',
        description: 'JWT refresh token',
    })
    refreshToken: string;
}
