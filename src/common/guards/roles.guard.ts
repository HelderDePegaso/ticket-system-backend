
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} 

  canActivate(context: ExecutionContext): boolean {
    console.log("RolesGuard")
    const roles = this.reflector.get(RolesDecorator, context.getHandler());
    console.log(roles)
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const matchedRoles = this.matchRoles(roles, user.roles);
    request.user = { ...user, acceptedRoles: matchedRoles };

    return matchedRoles.length > 0;
  }
    matchRoles(roles: string[], roles1: any): string[] {
        return roles.filter((role) => roles1.includes(role));
    }
}
