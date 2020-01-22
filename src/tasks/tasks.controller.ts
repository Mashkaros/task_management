import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { messageResponse } from 'dist/tasks/dto/message-response.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';



@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }
    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): messageResponse {
        return this.taskService.deleteTask(id);
    }

    @Patch(':id/status')
    uodateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.taskService.updateTaskStatus(id, status);
    }
}
