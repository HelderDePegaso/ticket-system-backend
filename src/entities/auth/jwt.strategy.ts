

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import type { StringValue } from "ms";

@Injectable()
export class JWTStrategy {

    private jwt_secret: string;

    private time: StringValue | string

    private option: jwt.SignOptions

    constructor() {
        this.jwt_secret = process.env.JWT_SECRET || 'w';
        this.time = process.env.JWT_EXPIRES_IN as StringValue || '3600s' as StringValue; 
        this.option = { expiresIn: this.time } as jwt.SignOptions
    }

    generateToken (value: object) {
        return jwt.sign(value, this.jwt_secret, this.option);

    } 

    verifyToken(token:string) {
        console.log("Verificando token")
        try {
            console.log("Verificando token")
           const decoded: any = jwt.verify(token, this.jwt_secret ) 

           return decoded
        
        } catch(e: unknown) {
            
            if (e instanceof jwt.TokenExpiredError) {
                console.log("Token expirado")
                throw e
            } else if (e instanceof jwt.JsonWebTokenError) {
                console.log("Token JsonWebTokenError")
                console.log(e)
                throw e
            } else if (e instanceof jwt.NotBeforeError) {
                console.log("Token NotBeforeError")
                console.log(e)
                throw e
            } else {
                console.log("Token inválido - Alguma coisa deu errado")
                console.log(e)
                return new Error("Token inválido")
            }
        }
        
    }
}