import { Module } from "@nestjs/common";
import { TypeOrmConfig } from "./ORM/orm-config";

@Module({
    imports : [
        TypeOrmConfig
    ],
    controllers : [

    ],
    providers : [

    ]
})
export class DatabaseModule{}