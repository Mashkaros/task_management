import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { messageResponse } from 'dist/tasks/dto/message-response.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }
    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Get()
    getTasks(): Task[] {
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
}
