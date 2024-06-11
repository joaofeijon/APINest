import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"

export class logInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const dt = Date.now()

        return next.handle().pipe( tap(() => {
            const request = context.switchToHttp().getRequest()
            console.log(`URL: ${request.url}`)
            console.log(`Method: ${request.method}`)
            console.log(`Exec levou: ${Date.now() - dt } mls`)
        }))
    }
}