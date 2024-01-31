import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entites/user.entity";
import { Post } from "./entity/posts/post.entity";
import { CreatePostDTO } from "./dto/posts/create-post.dto";
import { Repository } from "typeorm";
import { Category } from "./entity/category/category.entity";
import { CreateCategoryDTO } from "./dto/category/create-category.dto";
import { ThumnailDTO } from "./dto/dbfile/dbfile.dto";
import { DBFile } from "./entity/dbfile/dbfile.entity";

@Injectable()
export class PostService{
    constructor(
        @InjectRepository(User) 
        private readonly UserRepository : Repository<User>,
        @InjectRepository(Post)
        private readonly PostRepository  : Repository<Post>,
        @InjectRepository(Category)
        private readonly CategoryRepository : Repository<Category>,
        @InjectRepository(DBFile)
        private readonly ThumnailRepository : Repository<DBFile>
    ){}

    async createPost(userId : number,createPostDto : CreatePostDTO){
        const user = await this.UserRepository.findOneBy({
            id : userId
        })

        if(!user) throw new BadRequestException('User Not Found');

        const newPost = this.PostRepository.create({
            ...createPostDto,
            user
        })

        return await this.PostRepository.save(newPost);
    }

    async createCategoryToPost(userId : number, postId : number , createCategoryDto : CreateCategoryDTO){
        const post = await this.PostRepository.findOne({
            where : {id : postId , user : { id : userId}}
        })
        if(!post) {
            throw new BadRequestException('Post Not Found');
        }

        const newCategory =  this.CategoryRepository.create({
            ...createCategoryDto,
            post
        })

        return await this.CategoryRepository.save(newCategory);
        // console.log(post);
    }

    async createThumnailForProduct(userId : number,postId : number,dbfileDto : ThumnailDTO){
        const post = await this.PostRepository.findOne({
            where : { id : postId , user : {id : userId}}
        });

        if(!post){
            throw new BadRequestException("Post Not found");
        }

        const newThumnail = await this.ThumnailRepository.create({
            ...dbfileDto,
            post
        })

        return this.ThumnailRepository.save(newThumnail);
    }
}