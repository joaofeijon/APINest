import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDTO{
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 6,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0

    })
    password: string
}