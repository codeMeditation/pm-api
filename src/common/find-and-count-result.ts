export class FindAndCountResult<T> {
  public readonly entities: T[];
  public readonly count: number;

  public constructor(entities: T[], count: number) {
    this.entities = entities;
    this.count = count;
  }

  public static fromQuery<T>(
    queryResult: [T[], number],
  ): FindAndCountResult<T> {
    return new FindAndCountResult(queryResult[0], queryResult[1]);
  }
}
