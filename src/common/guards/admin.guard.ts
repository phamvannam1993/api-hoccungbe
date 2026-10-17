import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '../../modules/users/entities/user.entity';

/** Chỉ cho tài khoản admin (dùng sau AuthGuard('jwt'), nơi đã gắn req.user từ JwtStrategy). */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<{ user?: { role?: string } }>();
    if (req.user?.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Chỉ quản trị viên được thực hiện thao tác này',
      );
    }
    return true;
  }
}
