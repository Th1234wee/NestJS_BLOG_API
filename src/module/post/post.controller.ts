import { 
    BadRequestException, 
    Body, 
    Controller, 
    Param, 
    ParseIntPipe, 
    Post, 
    UseGuards, 
    UseInterceptors 
} from "@nestjs/common";
import {
    ApiConsumes, 
    ApiTags 
} from "@nestjs/swagger";
import { PostService } from "./post.service";
import { CreatePostDTO } from "./dto/posts/create-post.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { CreateCategoryDTO } from "./dto/category/create-category.dto";
import { ThumnailDTO } from "./dto/dbfile/dbfile.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import LocalFileIntercepter from "src/core/interceptor/localFile.intercepter";

@ApiTags('Post Route')
@Controller('post')
export class PostController{
    constructor(
        private readonly postService : PostService
    ){}

    // @UseGuards(JwtAuthGuard)
    @Post('/:id/posts')
    async createPost(
        @Param('id',ParseIntPipe) id : number,
        @Body() createPostDto : CreatePostDTO
    ){
        return await this.postService.createPost(id,createPostDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('/:userId/posts/:postId/category') 
    async createPostCategory(
        @Param('userId',ParseIntPipe) userId : number,
        @Param('postId',ParseIntPipe) postId : number,
        @Body() createCategory : CreateCategoryDTO
    ){
        return await this.postService.createCategoryToPost(userId,postId,createCategory);    
    }

    @Post(':userId/posts/:postId/thumnail')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @UseInterceptors(
        LocalFileIntercepter({
            fieldName : 'file',
            path : '/image',
            fileFilter : (request , file , callback) => {
                if(!file.mimetype.includes('image')){
                    return callback(
                        new BadRequestException('Provide A Valid Image'),
                        false
                    );
                }
                callback(null,true);
            },
            limits :{
                fileSize : Math.pow(1024,4)
            }
        })
    )    
    async createThumnailForPost(
        @Param('userId') userId : number,
        @Param('postId') postId : number,
        @Body() dbfile : any
    ){
        return await this.postService.createThumnailForProduct(userId , postId , dbfile);
    }
}