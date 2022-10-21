import { CanActivate, ExecutionContext } from '@nestjs/common';

export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }
    if (request.currentUser.role !== 'superadmin') {
      return false;
    }
    return true;
  }
}
