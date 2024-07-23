import {
  ConnectorGoogleProvider,
  ConnectorGoogleProviderToAdCustomerItem,
  ConnectorItemGoogleAdCustomer,
} from '@fiona/database/entities';
import { DataSource, Repository } from 'typeorm';
import * as path from 'path';
import { TestHelper } from '@fiona/database/testHelper';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthConnectorGoogleService,
  GoogleAuthOptionsProvider,
} from '@fiona/auth-connectors';
import { BaseMockRepository } from '@fiona/database/entities/fixtures/mockRepository';
import { faker } from '@faker-js/faker';
import { AuthConnectorsGoogleService } from './google-providers.service';


jest.setTimeout(500000);

type MockRepositoryType<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
type ExtendedMockRepositoryType<T = any> =
  | BaseMockRepository
  | MockRepositoryType<T>;

const createMockRepository = <T = any>(): ExtendedMockRepositoryType<T> => ({
  ...new BaseMockRepository(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
});

let db: DataSource;
const specId = path.basename(__filename);

beforeAll(async () => {
  db = await TestHelper.setupTestDB(specId);
});

afterAll(async () => {
  await TestHelper.teardownTestDB(specId, db);
});

describe('AuthConnectorsGoogleService', () => {
  let module: TestingModule;
  let authConnectorsGoogleService: AuthConnectorsGoogleService;
  let connectorGoogleRepository: BaseMockRepository;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthConnectorsGoogleService,
        AuthConnectorGoogleService,
        {
          provide: getRepositoryToken(ConnectorGoogleProvider),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(ConnectorItemGoogleAdCustomer),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ConnectorGoogleProviderToAdCustomerItem),
          useValue: {},
        },
        {
          provide: GoogleAuthOptionsProvider,
          useValue: {},
        },
      ],
    }).compile();
    authConnectorsGoogleService = module.get<AuthConnectorsGoogleService>(
      AuthConnectorsGoogleService,
    );
    connectorGoogleRepository = module.get<MockRepository>(
      getRepositoryToken(ConnectorGoogleProvider),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(authConnectorsGoogleService).toBeDefined();
  });
  it('should be defined', () => {
    expect(connectorGoogleRepository).toBeDefined();
  });
  describe('fetchAdCustomers', () => {
    it('should fail due missing connectorGoogleProvider to getAccessToken', async () => {
      const connectorProviderId = faker.string.uuid();
      connectorGoogleRepository.findOneBy.mockReturnValue(null);
      await expect(
        async () =>
          // eslint-disable-next-line @typescript-eslint/return-await
          await authConnectorsGoogleService.fetchAdCustomers(
            connectorProviderId,
          ),
      ).rejects.toThrow();
    });
  });
});
