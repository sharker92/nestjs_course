import { User } from '@fiona/database/entities';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { TestHelper } from '@fiona/database/testHelper';

jest.setTimeout(500000);
let db: DataSource;
const specId = path.basename(__filename);
beforeAll(async () => {
  db = await TestHelper.setupTestDB(specId);
});

afterAll(async () => {
  await TestHelper.teardownTestDB(specId, db);
});

describe('TestsX', () => {
  test('should create a user', async () => {
    const repo = db.getRepository(User);

    const u = repo.create({
      userEmail: 'test@test.com',
      firebaseUid: 'test2',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newUser = await repo.save(u);

    const fetchedUser = await repo.findOne({ where: { id: newUser.id } });
    expect(fetchedUser.firebaseUid).toEqual(newUser.firebaseUid);
  });

  test('it should be able to return the user', async () => {
    const repo = db.getRepository(User);
    const fetchedUser = await repo.findOne({
      where: { userEmail: 'test@test.com' },
    });
    expect(fetchedUser.firebaseUid).toEqual('test2');
  });
});
