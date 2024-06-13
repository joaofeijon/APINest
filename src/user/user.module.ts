import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserIdCheeckMiddleware } from "src/middlewares/user-id-check.middlware";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply( UserIdCheeckMiddleware ).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}