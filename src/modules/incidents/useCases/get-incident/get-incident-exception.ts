import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GetIncidentException {
  export class NotFoundIncidentError extends HttpException {
    constructor() {
      super('Incident does not exists', HttpStatus.NOT_FOUND);
    }
  }
}
