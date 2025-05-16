import { Injectable, NestMiddleware } from '@nestjs/common';
import { criptography } from 'src/security/security';
import { Request, Response , NextFunction  } from 'express';

@Injectable()
export class EncriptPass implements NestMiddleware {

    
    use(req: Request, res: Response, next: NextFunction) {
        console.log("EncriptPass sendo implementada" + " " + Date())
        console.log(req.body)
        req.body.password = this.encriptPass(req.body.password)
        console.log(req.body)
        next();
    }
    encriptPass(password: string): string {
        return criptography.crip(password)
    }
}