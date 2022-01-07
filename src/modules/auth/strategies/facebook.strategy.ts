import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

type FacebookUserData = {
  name: string;
  email: string;
  avatar: string;
};

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: 'http://localhost:3333/api/auth/facebook/callback',
      profileFields: ['emails', 'name', 'displayName', 'profileUrl', 'picture'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const { displayName, emails, photos } = profile;

    const facebookUser: FacebookUserData = {
      name: displayName,
      email: emails[0].value,
      avatar: photos[0].value,
    };

    done(null, facebookUser);
  }
}
