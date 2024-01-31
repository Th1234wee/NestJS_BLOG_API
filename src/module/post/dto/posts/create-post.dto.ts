import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDTO{
    @ApiProperty({
        description : "The Title of News"
    })
    @IsString()
    @IsNotEmpty()
    title : string

    @ApiProperty({
        description : "The Description of News"
    })
    @IsString()
    content : string
}