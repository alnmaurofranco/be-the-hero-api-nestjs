import { AuthenticateFacebookUseCase } from './authenticate-facebook-use-case';

describe('AuthenticateFacebookUseCase', () => {
  it('should be defined', () => {
    expect(new AuthenticateFacebookUseCase()).toBeDefined();
  });
});
