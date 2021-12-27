import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthenticateOngException {
  export class InvalidEmailOrPassword extends HttpException {
    constructor() {
      super('Invalid e-mail/password combination.', HttpStatus.BAD_REQUEST);
    }
  }
}
