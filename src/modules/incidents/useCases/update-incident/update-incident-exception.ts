import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateIncidentException {
  export class NotFoundIncidentError extends HttpException {
    constructor() {
      super('Incident does not exists', HttpStatus.NOT_FOUND);
    }
  }

  export class OngNotAllowedForbiddenException extends HttpException {
    constructor() {
      super(
        'You do not have permission to delete this Incident',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
