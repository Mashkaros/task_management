import { Controller, Get, Post, Body, Param, Delete, Query, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { messageResponse } from './dto/message-response.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';



@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTasksWithFilters(filterDto);
    //     }
    //     return this.taskService.getAllTasks();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<messageResponse> {
        return this.taskService.deleteTask(id);
    }

    // @Patch(':id/status')
    // uodateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ): Task {
    //     return this.taskService.updateTaskStatus(id, status);
    // }
}
