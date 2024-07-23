export class BaseMockRepository {
  metadata = {
    columns: [] as any[], // remove as any
    relations: [] as any[], // remove as any
    connection: { options: {} },
  };
}
