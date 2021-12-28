import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GetAllIncidentException {
  export class EmptyListIncidentError extends HttpException {
    constructor() {
      super('List of Incident is currently empty.', HttpStatus.LENGTH_REQUIRED);
    }
  }
}
