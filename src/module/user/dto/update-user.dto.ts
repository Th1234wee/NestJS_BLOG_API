import { PartialType } from "@nestjs/swagger";
import { UserDTO } from "./create-user.dto";

export class EditUserDTO extends PartialType(UserDTO){}