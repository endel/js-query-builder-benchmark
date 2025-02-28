import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroORM, Entity, PrimaryKey, Property, ManyToOne, EntityManager } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Entity()
class User {
  @PrimaryKey() id!: number;
  @Property() name!: string;
  @Property() age!: number;
  @Property() active!: boolean;
}

@Entity()
class Account {
  @PrimaryKey() id!: number;
  @Property() accountNumber!: string;
  @ManyToOne(() => User) user!: User;
}

let orm: any;
let qbu: any;
let qba: any;

export async function setup() {
  orm = await MikroORM.init({
    entities: [User, Account],
    metadataProvider: TsMorphMetadataProvider,
    driver: PostgreSqlDriver,
    dbName: "test",
  })

  qbu = orm.em.createQueryBuilder(User);
  qba = orm.em.createQueryBuilder(Account);
}

export function simple() {
  return qbu.clone().select('*').where({ id: 1 }).getQuery();
}

export function innerJoin() {
  // TODO: this is not correct
  qba.clone().select("*").innerJoin("user", "u").where({ 'u.id': 'a0.user_id' });
  return qba.getQuery();
}

