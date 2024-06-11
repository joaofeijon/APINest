import { BadRequestException, NestMiddleware } from "@nestjs/common";

export class UserIdCheeckMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        const id = req.params.id

        console.log("ANTES")
        if( isNaN(Number( id )) || Number( id ) <= 0 ){
            throw new BadRequestException("ID invalido!!!")
        }
        console.log("depos")
        next()
    }
}