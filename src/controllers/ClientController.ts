import AppError from '../errors/AppError';
import { Request, Response } from 'express';
import { clientRepository } from '../repositories/clientRepository';
import authConfig from '../config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class ClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const clientAlreadyExists = await clientRepository.findByEmail(email);

    if (clientAlreadyExists) {
      throw new AppError('This email is already registered', 400);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newClient = clientRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
    });

    await clientRepository.save(newClient);

    const userWithoutPassword = {
      id: newClient.id,
      name: newClient.name,
      email: newClient.email,
      created_at: newClient.createdAt,
      updated_at: newClient.updatedAt,
    };

    return response.status(201).json(userWithoutPassword);
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const client = await clientRepository.findByEmail(email);

    if (!client) {
      throw new AppError('Incorrect email/password combination.', 404);
    }

    const verifyPass = await bcrypt.compare(password, client.password);

    if (!verifyPass) {
      throw new AppError('Incorrect email/password combination.', 400);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ id: client.id }, secret, {
      subject: client.id,
      expiresIn,
    });

    const { password: _, ...clientLogin } = client;

    return response.json({ client: clientLogin, token });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const client = await clientRepository.findOneBy(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const { password: _, ...clientWithoutPassword } = client;

    return response.json(clientWithoutPassword);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const clients = await clientRepository.find();

    const clientsWithoutPassword = clients.map(client => {
      const { password: _, ...clientWithoutPassword } = client;
      return clientWithoutPassword;
    });

    return response.json(clientsWithoutPassword);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email } = request.body;
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

    await clientRepository.save(client);

    const { password: _, ...clientWithoutPassword } = client;

    return response.json(clientWithoutPassword);
  }

  public async changePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { oldPassword, newPassword } = request.body;
    const id = request.params;

    const client = await clientRepository.findOneBy(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const verifyPass = await bcrypt.compare(oldPassword, client.password);

    if (!verifyPass) {
      throw new AppError('Incorrect old password', 400);
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    client.password = hashPassword;

    await clientRepository.save(client);

    const { password: _, ...clientWithoutPassword } = client;

    return response.json(clientWithoutPassword);
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
