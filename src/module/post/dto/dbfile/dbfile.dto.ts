import { 
    ApiProperty 
} from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ThumnailDTO{
    @ApiProperty({
        description : "The image of news",
        example : "http://localhost:8888/uploads/example.jpg"
    })
    url : string
}