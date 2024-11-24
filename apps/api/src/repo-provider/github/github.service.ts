import { Injectable } from '@nestjs/common';
import { RepoProvider, User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RepositoryProviderService } from '../repo-provider.service';
import { CreateRepoProviderDto } from '../dto/create-repo-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GithubService extends RepositoryProviderService {
    constructor(
        protected readonly userService: UserService,
        protected readonly prisma: PrismaService
    ) {
        super(userService, prisma);
    }

    async validateUser(githubUser: CreateUserDto): Promise<User> {
        const user = await this.userService.findByEmail(githubUser.email);
        if (user) return user;
        return await this.userService.create(githubUser);
    }

    async createRepoProvider(createRepoProviderDto: CreateRepoProviderDto): Promise<RepoProvider> {
        return await this.prisma.repoProvider.create({
            data: createRepoProviderDto
        })
    }


}
