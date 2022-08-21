import {
  Get,
  Body,
  Controller,
  Post,
  Request,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { BoardService } from '~/services/board/board.service';
import { CreateTaskDTO, ReorderTaskDTO, MoveTaskDTO } from './dto';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Board')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/board')
export class BoardController {
  constructor(private readonly appService: BoardService) { }

  @Get('/')
  getBoards(): Promise<any> {
    return this.appService.getBoards();
  }

  @Post('/:boardId/task')
  @ApiParam({ name: 'boardId', type: String })
  createTask(
    @Request() req: any,
    @Param('boardId') boardId: string,
    @Body() authDto: CreateTaskDTO,
  ): Promise<any> {
    return this.appService.createTask(req.user.id, boardId, authDto);
  }

  @Put('/:boardId/task/:taskId')
  @ApiParam({ name: 'boardId', type: String })
  @ApiParam({ name: 'taskId', type: String })
  updateTask(
    @Request() req: any,
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() authDto: CreateTaskDTO,
  ): Promise<any> {
    return this.appService.updateTask(req.user.id, boardId, taskId, authDto);
  }

  @Put('/:boardId/task')
  @ApiParam({ name: 'boardId', type: String })
  reorderTask(
    @Request() req: any,
    @Param('boardId') boardId: string,
    @Body() reorderDTO: ReorderTaskDTO,
  ): Promise<any> {
    return this.appService.reorderTask(req.user.id, boardId, reorderDTO);
  }

  @Put('/:boardId/task/:taskId/destination-board/:desinationBoardId')
  @ApiParam({ name: 'boardId', type: String })
  moveTask(
    @Request() req: any,
    @Param('boardId') boardId: string,
    @Param('desinationBoardId') desinationBoardId: string,
    @Param('taskId') taskId: string,
    @Body() moveTaskDTO: MoveTaskDTO,
  ): Promise<any> {
    return this.appService.moveTask(
      req.user.id,
      boardId,
      desinationBoardId,
      taskId,
      moveTaskDTO,
    );
  }
}
