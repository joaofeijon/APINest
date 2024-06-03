import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService{

    constructor (private readonly prisma: PrismaService){}

    async create( {email, name, password}: CreateUserDTO ){
        return await this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
    }
}