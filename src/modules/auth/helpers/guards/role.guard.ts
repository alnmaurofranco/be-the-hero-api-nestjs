import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());

    if (!role || role !== 'admin') {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const ongsExists = await this.ongsRepository.findById(user.sub);

    if (!ongsExists) {
      throw new UnauthorizedException();
    }

    if (ongsExists.isAdmin === false) {
      throw new UnauthorizedException(
        'Not authorized because you are not an administrator',
      );
    }

    return true;
  }
}
