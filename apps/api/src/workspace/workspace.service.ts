import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create a new workspace and associate it with the user
   */
  async create(createWorkspaceDto: CreateWorkspaceDto, user: User) {
    return this.prisma.workspace.create({
      data: {
        name: createWorkspaceDto.name,
        Users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  /**
   * Event listener for user creation, automatically creates a personal workspace for the user
   */
  @OnEvent('user.created')
  async handleUserCreatedEvent(user: User) {
    const createWorkspaceDto = new CreateWorkspaceDto();
    createWorkspaceDto.name = `${user.name}'s Personal Workspace`;

    await this.create(createWorkspaceDto, user);
  }

  /**
   * Find and return all workspaces
   */
  async findAll() {
    return this.prisma.workspace.findMany();
  }

  /**
   * Find and return a workspace by its ID
   */
  async findOne(id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }

    return workspace;
  }

  /**
   * Update a workspace by its ID
   */
  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    const existingWorkspace = await this.findOne(id);

    return this.prisma.workspace.update({
      where: { id: existingWorkspace.id },
      data: {
        name: updateWorkspaceDto.name,
      },
    });
  }

  /**
   * Remove a workspace by its ID
   */
  async remove(id: string) {
    const existingWorkspace = await this.findOne(id);

    return this.prisma.workspace.delete({
      where: { id: existingWorkspace.id },
    });
  }
}
