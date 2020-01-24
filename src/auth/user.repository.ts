import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { messageResponse } from "src/tasks/dto/message-response.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<messageResponse> {
        const { username, password } = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.password = password;
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

        return {
            statusCode: 201,
            message: `User ${username} was successfully created`,
        }
    }
}