import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";
import githubOauthConfig from "../config/github-oauth.config";
import { ConfigType } from "@nestjs/config";
import { GithubService } from "../github/github.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(githubOauthConfig.KEY) private readonly githubConfig: ConfigType<typeof githubOauthConfig>,
        private readonly githubService: GithubService,
    ) {
        super({
            callbackURL: githubConfig.callbackURL,
            clientID: githubConfig.clientID,
            clientSecret: githubConfig.clientSecret,
            scope: ['user', 'repo'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
        const email = (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null;

        if (!email) {
            return done(new Error('No email found from GitHub profile'), null);
        }

        try {
            const user = await this.githubService.validateUser({
                email,
                name: profile.displayName,
                password: ''
            });
            this.githubService.saveProviderTokens(
                {
                    userId: user.id,
                    name: 'github',
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            )
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}