import {
  ConnectorItemMetaAdAccount,
  ConnectorItemMetaFbPage,
  ConnectorMetaProvider,
  ConnectorMetaProviderToAdAccountItem,
  ConnectorMetaProviderToFbPageItem,
} from '@fiona/database/entities';

import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthConnectorMetaService,
  MetaAuthOptionsProvider,
} from '@fiona/auth-connectors';
import { BaseMockRepository } from '@fiona/database/entities/mocks/mockRepository';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { Repository } from 'typeorm';
import { AuthConnectorsMetaController } from './meta-providers.controller';
import { AuthConnectorsMetaService } from './meta-providers.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.setTimeout(500000);

type MockRepositoryType<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
type ExtendedMockRepositoryType<T = any> = RecursivePartial<
  BaseMockRepository & MockRepositoryType<T>
>;
const createMockRepository = <T = any>(): ExtendedMockRepositoryType<T> => ({
  ...new BaseMockRepository(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
});
// const createMockRepository2 = () => ({
//   ...new BaseMockRepository(),
//   findOne: jest.fn(),
//   findOneBy: jest.fn(),
// });

interface UserSettings {
  one: {
    three: number;
    four: number;
  };
  two: {
    five: number;
    six: number;
  };
}

const peo: RecursivePartial<UserSettings> = { one: {} };
const x = peo;
describe('AuthConnectorsMetaService', () => {
  let module: TestingModule;
  let authConnectorsMetaService: AuthConnectorsMetaService;
  let connectorMetaRepository: ExtendedMockRepositoryType;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthConnectorsMetaController],
      providers: [
        AuthConnectorsMetaService,
        AuthConnectorMetaService,
        {
          provide: getRepositoryToken(ConnectorMetaProvider),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(ConnectorItemMetaAdAccount),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ConnectorMetaProviderToAdAccountItem),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ConnectorItemMetaFbPage),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ConnectorMetaProviderToFbPageItem),
          useValue: {},
        },
        {
          provide: MetaAuthOptionsProvider,
          useValue: {},
        },
      ],
    }).compile();
    authConnectorsMetaService = module.get<AuthConnectorsMetaService>(
      AuthConnectorsMetaService,
    );
    connectorMetaRepository = module.get<ExtendedMockRepositoryType>(
      getRepositoryToken(ConnectorMetaProvider),
    );
  });
  it('should be defined', () => {
    expect(authConnectorsMetaService).toBeDefined();
  });

  describe('login method', () => {
    beforeAll(() => {});

    it('Should get user data and store it', async () => {
      // expect.assertions(2);
      mockedAxios.get
        .mockResolvedValueOnce({
          data: {
            access_token: faker.string.nanoid(256),
            token_type: 'bearer',
          },
        })
        .mockResolvedValueOnce({
          data: {
            id: faker.string.numeric(17),
            email: faker.internet.email(),
          },
        });
      connectorMetaRepository.findOne.mockReturnValue('something');
      const fionaEmail = faker.internet.email();
      const code = faker.string.nanoid(387);
      await authConnectorsMetaService.login(fionaEmail, code);
      // mokear this.options env variables
      // AUTH_FACEBOOK_API_VERSION
      // AUTH_FACEBOOK_CLIENT_ID
      // AUTH_FACEBOOK_SECRET
      // AUTH_FACEBOOK_REDIRECT_URL
      // options.scope "email,ads_read,ads_management,pages_read_engagement,business_management,pages_read_user_content,pages_show_list,instagram_basic"
      // 2 axios get
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      // createOrFetchUserTokenRecord find one y si no encuentra es un create e insert
      // options.encryptionKey
      // updateConnectorProviderRecord 1 update y regresar id
    });
  });
});
