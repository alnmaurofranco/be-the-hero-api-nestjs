import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateOngException {
  export class OngAlreadyExistsError extends HttpException {
    constructor() {
      super('Ong already exists', HttpStatus.CONFLICT);
    }
  }
}
