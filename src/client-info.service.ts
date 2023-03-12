import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientInfo } from './client-info.entity';

@Injectable()
export class ClientInfoService {
  constructor(
    @InjectRepository(ClientInfo)
    private readonly clientInfoRepository: Repository<ClientInfo>,
  ) {}

  async create(clientInfo: ClientInfo): Promise<ClientInfo> {
    return await this.clientInfoRepository.save(clientInfo);
  }

  async findAll(): Promise<ClientInfo[]> {
    return await this.clientInfoRepository.find();
  }
}
