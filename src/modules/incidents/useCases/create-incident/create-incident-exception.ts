import { HttpException, HttpStatus } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateIncidentException {
  export class AlreadyExistsIncidentError extends HttpException {
    constructor() {
      super('Incident already exists.', HttpStatus.CONFLICT);
    }
  }
}
