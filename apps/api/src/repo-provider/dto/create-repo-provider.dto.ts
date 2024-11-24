import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRepoProviderDto {
    @ApiProperty({
        description: 'The name of the repository provider',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The app ID of the repository provider (optional)',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsUUID()
    appId?: string;

    @ApiProperty({
        description: 'The access token for the repository provider (optional)',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    accessToken?: string;

    @ApiProperty({
        description: 'The refresh token for the repository provider (optional)',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    refreshToken?: string;

    @ApiProperty({
        description: 'The expiration date of the token (optional)',
        type: Date,
        required: false,
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tokenExpiresAt?: Date;

    @ApiProperty({
        description: 'The ID of the associated user',
        type: Number,
    })
    @IsInt()
    userId: number;

    @ApiProperty({
        description: 'Indicates whether OAuth is enabled for the repository provider',
        type: Boolean,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isOauthable?: boolean;
}
