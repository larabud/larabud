import { Global, Injectable, Module, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClsModule, ClsService } from 'nestjs-cls';

export function prismaWorkspaceFactory(
    prisma: PrismaService,
    workspace_id: number | null,
): PrismaService {
    return prisma.$extends({
        query: {
            $allModels: {
                findMany: function ({ query, args }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as unknown;

                    return query(args);
                },
                findFirst({ query, args }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as unknown;

                    return query(args);
                },
                findUnique({ query, args }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as any;

                    return query(args);
                },
                findUniqueOrThrow({ query, args }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as any;

                    return query(args);
                },
                findFirstOrThrow({ query, args }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as unknown;

                    return query(args);
                },
                updateMany({ args, query }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as unknown;

                    return query(args);
                },

                deleteMany({ args, query }) {
                    args.where = {
                        ...args.where,
                        workspace_id,
                    } as unknown;

                    return query(args);
                },

                create({ query, args }) {
                    args.data = {
                        ...args.data,
                        workspace_id: workspace_id,
                    } as any;

                    return query(args);
                },
                upsert({ args, query }) {
                    args.where = {
                        ...args.where,
                        workspace_id: workspace_id,
                    } as any;

                    args.create = {
                        ...args.create,
                        workspace_id: workspace_id,
                    } as any;

                    return query(args);
                },

                createMany({ query, args }) {
                    if (Array.isArray(args.data)) {
                        args.data = args.data.map(
                            (d) =>
                                ({
                                    ...d,
                                    workspace_id: workspace_id,
                                }) as any,
                        );
                    } else {
                        args.data = {
                            ...args.data,
                            workspace_id: workspace_id,
                        } as any;
                    }

                    return query(args);
                },
            },
        },
    }) as PrismaService;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(private readonly cls: ClsService) {
        super({
            log: ['query'],
        });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    get instance(): PrismaService {
        const workspaceId = this.cls.get('workspaceId');
        return prismaWorkspaceFactory(this, workspaceId);
    }
}

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
    imports: [ClsModule.forFeature()],
})
export class PrismaModule { }