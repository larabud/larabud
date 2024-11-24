import { IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateRepoProviderTokensDto {
    @ApiProperty({
        description: 'The new access token for the repository provider (optional)',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    accessToken?: string;

    @ApiProperty({
        description: 'The new refresh token for the repository provider (optional)',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    refreshToken?: string;

    @ApiProperty({
        description: 'The new expiration date for the tokens (optional)',
        type: Date,
        required: false,
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    tokenExpiresAt?: Date;
}
