import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AutoResertDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthSerive } from "./auth.service";

@Controller("auth")
export class AuthController{

    constructor( 
        private readonly userService: UserService,
        private readonly authService: AuthSerive
        
    ){}

    @Post("login")
    async login( @Body() {email, password}: AuthLoginDTO ){
        return await this.authService.login(email, password)
    }

    @Post("register")
    async register( @Body() body: AuthRegisterDTO ){
        return this.userService.create( body )
    }

    @Post("forget")
    async forget( @Body() {email}: AuthForgetDTO){
        return await this.authService.forget( email )
    }

    @Post("reset")
    async reset(@Body() {password, token}: AutoResertDTO){
        return await this.authService.reset(password, token)
    }
}