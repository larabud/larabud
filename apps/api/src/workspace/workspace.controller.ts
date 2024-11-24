import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { SkipWorkspace } from 'src/common/decorators/skip-workspace.decorator';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @Post()
  @SkipWorkspace()
  @ApiOperation({ summary: 'Create a Workspace' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Create Workspace fields',
    type: CreateWorkspaceDto,
  })
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Request() req) {
    const user = req.user;
    return this.workspaceService.create(createWorkspaceDto, user);
  }

  @Get()
  @SkipWorkspace()
  @ApiBearerAuth()
  findAll() {
    return this.workspaceService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'x-workspace',
    description: 'Workspace specifier.',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(id);
  }
}
