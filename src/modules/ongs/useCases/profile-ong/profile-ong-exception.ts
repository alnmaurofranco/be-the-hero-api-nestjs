import { HttpException, HttpStatus } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProfileOngException {
  export class NotFoundOngError extends HttpException {
    constructor() {
      super('ONG does not exists', HttpStatus.NOT_FOUND);
    }
  }
}
