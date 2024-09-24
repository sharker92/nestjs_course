import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
// unit test should be done in isolation - shouldn't rely on external dependencies
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //Group by methods
  describe('findOne', () => {
    describe('when cofeewith ID exists', () => {
      it('should return the coffeee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        // hacer la versión con sin el try catch como dice mi curso.
        const coffeeId = 1;
        coffeeRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(coffeeId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
