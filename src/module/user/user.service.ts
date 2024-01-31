import { 
    BadRequestException, 
    Injectable, 
    NotFoundException 
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entites/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/create-user.dto";
import { EditUserDTO } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>
    ){}

    async getAll(){
        return await this.userRepository.find({relations : ['post','post.category']});
    }

    async getOneUser(id : number , userEntity?: User){
        const foundUser = await this.userRepository
                         .findOne({where : {id}})
                         .then(user => (!userEntity ? user : !!user && userEntity.id === user.id ? user : null));
        if(!foundUser){
            throw new NotFoundException('User Not Found');
        }

        return foundUser;
    }
    async findByEmail(email : string):Promise<User> | null{
        return await this.userRepository.findOne(
            {
            where : {email},
            },
        );
    }

    async createUser(userDto : UserDTO):Promise<User>{
        const userExist = await this.userRepository.findOne({
            where : {email : userDto.email}
        })
        if(userExist){
            throw new BadRequestException('User already register');
        }

        const newUser = this.userRepository.create(userDto);
        const user    = await this.userRepository.save(newUser);

        delete user.password;
        return user;
    }

    async editUser(id : number , userDto : EditUserDTO , userEntity? : User):Promise<User>{
        const user = await this.getOneUser(id , userEntity);
        const editedUser = Object.assign(user,userDto);
        return editedUser;
    }

    async deleteOne(id : number , userEntity?: User){
        const user = await this.getOneUser(id , userEntity);

        await this.userRepository.remove(user);

        return "The User has been deleted";
    }

    async compareHash(password : string , hashedPassword : string){
        return await bcrypt.compare(password , hashedPassword);
    }
}