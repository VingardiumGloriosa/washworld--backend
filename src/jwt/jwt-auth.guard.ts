import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


@Injectable()
export class MatchUserIdGuard extends JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const canActivate = await super.canActivate(context);
        if (!canActivate) {
            return false;
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userIdFromParam = parseInt(request.params.userId, 10);
    
        if (!user || !userIdFromParam) {
            return false;
        }
    
        const foundUser = await this.userService.findOneByEmail(user.email);
    
        return foundUser && foundUser.id === userIdFromParam;
    }
}