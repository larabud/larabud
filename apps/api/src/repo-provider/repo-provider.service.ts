import { Prisma, RepoProvider } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { CreateRepoProviderDto } from "./dto/create-repo-provider.dto";

export abstract class RepositoryProviderService {
    constructor(
        protected readonly userService: UserService,
        protected readonly prisma: PrismaService
    ) { }

    async getAllRepoProvidersForUser(userId: number) {
        const repoProviders = await this.prisma.repoProvider.findMany({
            where: {
                userId: userId,
            },
        });
        return repoProviders;
    }

    async getProviderTokens(userId: number, name: string): Promise<RepoProvider> {
        return this.prisma.repoProvider.findUnique({
            where: { userId_name: { userId, name } },
        });
    }

    async saveProviderTokens(
        createRepoProviderDto: CreateRepoProviderDto
    ): Promise<RepoProvider> {
        const { userId, name, accessToken, refreshToken, tokenExpiresAt, isOauthable, appId } = createRepoProviderDto;

        return this.prisma.repoProvider.upsert({
            where: { userId_name: { userId, name } },
            update: {
                accessToken,
                appId,
                refreshToken,
                tokenExpiresAt,
                isOauthable
            },
            create: {
                userId,
                name,
                appId,
                accessToken,
                refreshToken,
                tokenExpiresAt,
                isOauthable
            },
        });
    }
}
