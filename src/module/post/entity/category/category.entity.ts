import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Post } from "../posts/post.entity";   

@Entity('Category')
export class Category{
    @PrimaryGeneratedColumn()
    id : number

    @Column({'type' : 'varchar', 'length' : 255 , 'default' : '', 'nullable' : false})
    name : string

    @CreateDateColumn({'name' : 'created_at', 'type' : 'timestamp'})
    created_at : Date

    @ManyToOne(() => Post , post => post.category)
    post : Post
}