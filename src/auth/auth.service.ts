import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import { access } from "fs";

@Injectable()
export class AuthSerive{
    constructor( 
        private readonly jwtService: JwtService, 
        private readonly prisma: PrismaService,
        private readonly userSerive: UserService
    ) {}

    async createToken(user: User){
        return {
            access: this.jwtService.sign({
                sub: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                issuer: "login",
                audience: "users"
            })
        }
    }

    async checkToken( token: string ){
        // return this.jwtService.verify()
    }

    async login(email: string, password: string){
        
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        if( !user )
            throw new UnauthorizedException("Email ou senha esta incorreto!!!")
        
        return this.createToken( user )
    }

    async forget (email: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if( !user )
            throw new UnauthorizedException("Email esta incorreto!!!")
        
        // Enviar o EMAIL

        return true
    }

    async reset (password: string, token: string){
        //TO DO: validar o TOKEN

        const id = 0

        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })
        //@ts-ignore
        return this.checkToken( user )
    }

    async register (data: AuthRegisterDTO){
        const user = await this.userSerive.create( data )

        //@ts-ignore
        return this.checkToken( user )
    }
}