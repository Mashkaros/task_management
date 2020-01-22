import { TaskStatus } from "dist/tasks/task.model";

export class GetTaskFilterDto {
    status: TaskStatus;
    search: string;
}