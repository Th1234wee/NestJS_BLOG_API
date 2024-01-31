import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/module/post/entity/category/category.entity";
import { DBFile } from "src/module/post/entity/dbfile/dbfile.entity";
import { Post } from "src/module/post/entity/posts/post.entity";
import { User } from "src/module/user/entites/user.entity";

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
    imports : [
        ConfigModule
    ],
    useFactory : async (configService : ConfigService) => ({
        type : "mysql",
        host : configService.get<string>('DB_HOST'),
        port : configService.get<number>('DB_PORT'),
        username : configService.get<string>('DB_USERNAME'),
        password : configService.get<string>('DB_PASSWORD'),
        database : configService.get<string>('DB_NAME'),
        entities : [User,Category,Post,DBFile],
    }),
    inject : [
        ConfigService
    ]
})