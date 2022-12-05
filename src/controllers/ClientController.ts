import { Request, Response } from 'express';
import { clientRepository } from '../repositories/clientRepository';

export class ClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const clientAlreadyExists = await clientRepository.findByCPF(cpf);

    if (clientAlreadyExists) {
      return response
        .status(400)
        .json({ error: 'This CPF client is already registered' });
    }

    try {
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
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const client = await clientRepository.findOneBy(id);

    if (!client) {
      return response.status(400).json({ error: 'Client not found' });
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
      return response.status(400).json({ error: 'Client not found' });
    }

    const clientAlreadyExists = await clientRepository.findByCPF(cpf);

    if (clientAlreadyExists && clientAlreadyExists.id !== client.id) {
      return response
        .status(400)
        .json({ error: 'This CPF client is already registered' });
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
      return response.status(400).json({ error: 'Client not found' });
    }

    await clientRepository.remove(client);

    return response.status(204).send();
  }
}
