import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "src/entities/customer.entity";
import { Repository } from "typeorm";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "./customerDTO/customer.dto";
import { CustomException } from "src/utils/customException";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customer: Repository<CustomerEntity>,
  ) {}

  async findAll(): Promise<any> {
    return this.customer.find({ where: { activated: true } });
  }

  async createCustome(createCustomer: CreateCustomerDTO): Promise<any> {
    const verifyCustomer = await this.customer.findOne({
      where: { email: createCustomer.email },
    });

    if (verifyCustomer) {
      throw new CustomException(
        "E-mail already registered!",
        HttpStatus.CONFLICT,
      );
    }

    const create = this.customer.create({
      name: createCustomer.name,
      code: createCustomer.code,
      observations: createCustomer.observations,
      dateOfBirth: createCustomer.dateOfBirth,
      rg: createCustomer.rg,
      ie: createCustomer.ie,
      cpf: createCustomer.cpf,
      cnpj: createCustomer.cnpj,
      address: createCustomer.address,
      telephone: createCustomer.telephone,
      email: createCustomer.email,
      activated: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.customer.save(create);
  }

  async updateCustomer(
    id: number,
    updateCustomer: UpdateCustomerDTO,
  ): Promise<any> {
    const checkCustomer = await this.customer.findOne({
      where: { id: id, activated: true },
    });

    if (!checkCustomer) {
      throw new CustomException("Customer not Found", HttpStatus.NOT_FOUND);
    }

    checkCustomer.name = updateCustomer.name;
    checkCustomer.code = updateCustomer.code;
    checkCustomer.observations = updateCustomer.observations;
    checkCustomer.dateOfBirth = updateCustomer.dateOfBirth;
    checkCustomer.rg = updateCustomer.rg;
    checkCustomer.ie = updateCustomer.ie;
    checkCustomer.cpf = updateCustomer.cpf;
    checkCustomer.cnpj = updateCustomer.cnpj;
    checkCustomer.address = updateCustomer.address;
    checkCustomer.telephone = updateCustomer.telephone;
    checkCustomer.email = updateCustomer.email;
    checkCustomer.updated_at = new Date();

    return await this.customer.save(checkCustomer);
  }

  async disableCustomer(id: number): Promise<any> {
    const checkCustomer = await this.customer.findOne({
      where: { id: id },
    });

    if (!checkCustomer) {
      throw new CustomException("Customer not Found", HttpStatus.NOT_FOUND);
    }

    checkCustomer.activated = false;
    checkCustomer.updated_at = new Date();

    return await this.customer.save(checkCustomer);
  }

  async activedCustomer(id: number): Promise<any> {
    const checkCustomer = await this.customer.findOne({
      where: { id: id },
    });

    if (!checkCustomer) {
      throw new CustomException("Customer not Found", HttpStatus.NOT_FOUND);
    }

    checkCustomer.activated = true;
    checkCustomer.updated_at = new Date();

    return await this.customer.save(checkCustomer);
  }
}
