import { HttpException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthenticateGoogleException {
  export class GoogleUserNotFound extends HttpException {}
}
