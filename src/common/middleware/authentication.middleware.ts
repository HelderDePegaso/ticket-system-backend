import { Inject, Injectable , NestMiddleware } from "@nestjs/common";

import { Request , Response , NextFunction } from 'express';
import { JWTStrategy } from "src/entities/auth/jwt.strategy";

export class AuthenticationTokenVerificationMiddleware implements  NestMiddleware { 

    constructor( private jwtStrategy: JWTStrategy) {
      this.jwtStrategy = new JWTStrategy();
    }

    use(req: Request, res: Response, next: NextFunction) {
        console.log("Iniciando verificação do token de autenticação");
        const authorizationToken: string | undefined = req.headers["authorization"] 

        console.log(authorizationToken);
        if (!authorizationToken || !authorizationToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const token:string = authorizationToken.split(' ')[1];


        console.log("O token -> " + token);
        try {
          console.log("this.jwtStrategy.verifyToken")
          console.log(this.jwtStrategy)
          const decoded = this.jwtStrategy.verifyToken(token);
          console.log("O decodificado -> " + decoded);
          ( req as any  ).user = decoded; 
          console.log(decoded);
          next();
        } catch (err) {
          return res.status(403).json({ message: 'Token inválido ou expirado' });
        }

        
    }
}