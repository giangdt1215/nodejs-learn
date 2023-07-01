import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {

  private customers: Customer[] = [
    {
      id: 1,
      email: "dtgiang@gmail.com",
      name: 'Giang Dang',
    },{
      id: 2,
      email: "adam@gmail.com",
      name: 'Adam Dang',
    },{
      id: 3,
      email: "spencer@gmail.com",
      name: 'Spencer Dang',
    },
  ]

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }

  getAll() {
    return this.customers;
  }
}
