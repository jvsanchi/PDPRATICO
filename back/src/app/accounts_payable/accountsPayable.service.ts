import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountsPayable } from "src/entities/accountsPayable.entity";
import { Repository } from "typeorm";
import { CreateAccounutsPayableDTO } from "./accounts_payableDTO/accountsPayable.dto";

@Injectable()
export class AccountsPayableService {
  constructor(
    @InjectRepository(AccountsPayable)
    private readonly accountsPayableRepository: Repository<AccountsPayable>,
  ) {}

  // Create
  async create(
    createAccountsPayableDto: CreateAccounutsPayableDTO,
  ): Promise<AccountsPayable> {
    const newAccountPayable = this.accountsPayableRepository.create(
      createAccountsPayableDto,
    );
    return this.accountsPayableRepository.save(newAccountPayable);
  }

  // Read All
  async findAll(): Promise<AccountsPayable[]> {
    return this.accountsPayableRepository.find();
  }

  // Read One by ID
  async findOne(id: number): Promise<AccountsPayable> {
    const accountPayable = await this.accountsPayableRepository.findOne({
      where: { id },
    });
    if (!accountPayable) {
      throw new NotFoundException(`AccountPayable with ID ${id} not found`);
    }
    return accountPayable;
  }

  // Update
  async update(
    id: number,
    updateAccountsPayableDto: any,
  ): Promise<AccountsPayable> {
    const accountPayable = await this.findOne(id);
    Object.assign(accountPayable, updateAccountsPayableDto);
    return this.accountsPayableRepository.save(accountPayable);
  }

  // Delete
  async remove(id: number): Promise<void> {
    const result = await this.accountsPayableRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`AccountPayable with ID ${id} not found`);
    }
  }
}
