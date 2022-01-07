import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from './guards/role.guard';

export function Role(role: string) {
  return applyDecorators(SetMetadata('role', role), UseGuards(RoleGuard));
}
