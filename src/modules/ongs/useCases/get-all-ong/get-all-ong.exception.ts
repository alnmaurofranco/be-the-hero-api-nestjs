import { HttpException, HttpStatus } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GetAllOngException {
  export class EmptyListOngError extends HttpException {
    constructor() {
      super('List of Ong is currently empty.', HttpStatus.LENGTH_REQUIRED);
    }
  }
}
