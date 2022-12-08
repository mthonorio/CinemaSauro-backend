import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import { clientRepository } from '../repositories/clientRepository';

export class ClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const clientAlreadyExists = await clientRepository.findByCPF(cpf);

    if (clientAlreadyExists) {
      throw new AppError('This CPF client is already registered', 400);
    }

    const client = clientRepository.create({
      name,
      cpf,
      email,
      password,
    });

    await clientRepository.save(client);

    const userWithoutPassword = {
      id: client.id,
      name: client.name,
      email: client.email,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    };

    return response.status(201).json(userWithoutPassword);
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const client = await clientRepository.findByEmail(email);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    if (client.password !== password) {
      throw new AppError('Incorrect password', 400);
    }

    const userWithoutPassword = {
      id: client.id,
      name: client.name,
      email: client.email,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    };

    return response.json(userWithoutPassword);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const client = await clientRepository.findOneBy(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    return response.json(client);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const clients = await clientRepository.find();

    return response.json(clients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;
    const id = request.params;

    const client = await clientRepository.findOneBy(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const clientAlreadyExists = await clientRepository.findByCPF(cpf);

    if (clientAlreadyExists && clientAlreadyExists.id !== client.id) {
      throw new AppError('This CPF client is already registered', 404);
    }

    client.name = name;
    client.cpf = cpf;
    client.email = email;
    client.password = password;

    await clientRepository.save(client);

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const client = await clientRepository.findOneBy(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    await clientRepository.remove(client);

    return response.status(204).send();
  }
}
