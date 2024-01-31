import { User } from "src/module/user/entites/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";
import { Category } from "../category/category.entity";
import { DBFile } from "../dbfile/dbfile.entity";

@Entity('Post')
export class Post{
    @PrimaryGeneratedColumn()
    id : number

    @Column({'type' : 'varchar' , 'length' : 255 , nullable : false})
    title : string

    @Column({'type' : 'text' , nullable : false})
    content : string

    @CreateDateColumn({'name': 'created_at','type' : 'timestamp'})
    created_at : Date

    @ManyToOne(
        () => User,
        (user) => user.post,
    )
    user : User

    @OneToMany(() => Category , category => category.post)
    category : Category[]

    @OneToMany(() => DBFile , dbfile => dbfile.post)
    thumnail : DBFile[]
}