import { Entity, Filter, Property } from '@mikro-orm/core';

interface RangeQuery {
  min: Date;
  max: Date;
}

@Entity()
@Filter({
  name: 'RangeFilter',
  default: false,
  cond: (args: RangeQuery) => {
    return {
      updatedAt: {
        gte: args.min,
        lte: args.max,
      },
    };
  },
})
export abstract class BaseEntity {
  @Property({
    autoincrement: true,
    primary: true,
    type: 'bigint',
  })
  id: number;

  @Property({
    defaultRaw: 'now()',
    type: 'timestamptz',
  })
  createdAt: Date;

  @Property({
    defaultRaw: 'now()',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @Property({
    type: 'timestamptz',
  })
  deletedAt: Date;
}
