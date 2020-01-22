import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import * as uuid from 'uuid/v1';
import { messageResponse } from './dto/message-response.dto';
import { GetTaskFilterDto } from 'dist/tasks/dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => {
                return task.title.includes(search) ||
                    task.description.includes(search);
            });
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        console.log(task);
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }


    deleteTask(id: string): messageResponse {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return {
            status: "ok",
            message: "task was successfully removed"
        }
    }
}
