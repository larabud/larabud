import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateWorkspaceDto {

    @ApiProperty({
        example: "JohnDoe's Workspace",
        description: 'Workspace name of the user',
        required: true,
    })
    @IsString()
    name: string;
}
