import Knex, { KnexTimeoutError } from "knex";

const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'myapp_test',
  },
});

export function simple() {
  return knex('users').where('id', 1).select('*').toSQL().sql;
}

export function innerJoin() {
  return knex('users').innerJoin('accounts', 'users.id', 'accounts.user_id').select('*').toSQL().sql;
}