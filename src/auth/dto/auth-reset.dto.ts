import { IsJWT, IsString, MinLength } from "class-validator";

export class AutoResertDTO{
    @IsString()
    @MinLength(6)
    password: string;

    @IsJWT()
    token: string
}