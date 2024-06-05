import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService{

    constructor (private readonly prisma: PrismaService){}

    async create( {email, name, password, birthAt}: CreateUserDTO ){
        return await this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                birthAt: birthAt
            }
        })
    }

    async readAll(){
        return await this.prisma.user.findMany()
    }

    async readOne(id: number){
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {name, email, password, birthAt}: UpdatePutUserDTO){

        this.exists(id)

        return this.prisma.user.update({
            data: {
                name,
                email,
                password,
                birthAt: birthAt ? new Date( birthAt ) : null
            },
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, {name, email, password, birthAt}: UpdatePatchUserDTO){

        this.exists(id)

        const data: any = {}

        if( birthAt ){
            data.birthAt = new Date( birthAt )
        }

        if( email )
            data.email = email

        if( name )
            data.email = name

        if( password )
            data.email = password

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async delete( id: number ){
        
        this.exists(id)

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number){
        if( !(await this.readOne(id)) )
            throw new NotFoundException("O usuario com esse id nao existi")
    }
}