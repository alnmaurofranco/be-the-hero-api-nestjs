import { IncidentsPrismaRepository } from './incidents-prisma-repository';

describe('IncidentsPrismaRepository', () => {
  it('should be defined', () => {
    expect(new IncidentsPrismaRepository()).toBeDefined();
  });
});
