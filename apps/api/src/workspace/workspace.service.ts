import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createWorkspaceDto: CreateWorkspaceDto, user: users) {
    return await this.prisma.workspaces.create({
      data: {
        name: createWorkspaceDto.name,
        users: {
          connect: {
            id: user.id
          }
        }
      },
    });
  }

  async findAll() {
    return await this.prisma.workspaces.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
