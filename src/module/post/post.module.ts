import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entity/posts/post.entity";
import { User } from "../user/entites/user.entity";
import { AuthModule } from "../auth/auth.module";
import { Category } from "./entity/category/category.entity";
import { DBFile } from "./entity/dbfile/dbfile.entity";

@Module({
    imports : [
        TypeOrmModule.forFeature([Post,User,Category,DBFile]),
        AuthModule
    ],
    controllers : [
        PostController
    ],
    providers : [
        PostService
    ],
    exports : [
        
    ]
})
export class PostModule{}