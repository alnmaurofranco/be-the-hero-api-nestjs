interface IAuthConfiguration {
  accessTokenSecretKey: string;
  accessTokenExpiresIn: string;
}

export const AuthConfiguration = (): IAuthConfiguration => ({
  accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
});
