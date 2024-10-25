import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SKIP_WORKSPACE_KEY } from '../decorators';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.reflector.get<boolean>(SKIP_WORKSPACE_KEY, context.getHandler());
    if (skip) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const workspace = request.headers['x-workspace'];

    if (!workspace) {
      throw new ForbiddenException('Workspace is required');
    }

    const userHasAccess = this.checkUserAccess(request.user, workspace);

    return userHasAccess;
  }

  private checkUserAccess(user: any, workspace: string): boolean {
    // Replace this with actual access logic
    // For example, check if the user has access to the given workspace
    return true
  }
}
