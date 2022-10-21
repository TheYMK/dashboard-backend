import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }
    if (request.currentUser.role !== 'admin') {
      return false;
    }
    return true;
  }
}
