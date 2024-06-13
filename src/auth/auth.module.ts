import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [ 
        JwtModule.register({
            secret: `aePWGQ:<@}?M!q;%5+DkY4uirnzl9@Z!` // chave do token JWT
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [ AuthController ]

})
export class AuthModule{

}