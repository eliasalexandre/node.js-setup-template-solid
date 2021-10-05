import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password } = request.body as IRequest;

    const user = await createUserUseCase.execute({ name, email, password });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
