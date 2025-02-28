import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: 'test',
    host: 'localhost',
    user: 'admin',
    port: 5434,
    max: 10,
  })
})

const db = new Kysely<any>({
  dialect,
})

export function simple() {
  return db.selectFrom('users').selectAll().where('id', '=', 1).compile().sql;
}

export function innerJoin() {
  return db.selectFrom('users').innerJoin('accounts', 'users.id', 'accounts.user_id').selectAll().compile().sql;
}