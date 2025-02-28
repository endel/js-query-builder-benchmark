# JavaScript Query Builder Micro Benchmark

This repository aims to benchmark different JavaScript query builders. Only the query building APIs are compared, not the execution and/or mapping of the results.

## Query Builders

- [Knex.js](https://knexjs.org/)
- [Kysely](https://kysely.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [TypeORM](https://typeorm.io/)
- [MikroORM](https://mikro-orm.io/) (Uses Knex.js under the hood)
- ~~[Objection.js](https://vincit.github.io/objection.js/)~~ (Uses Knex.js under the hood)
- ~~[Prisma](https://www.prisma.io/)~~ (Do not provide a query builder API)
- ~~[Sequelize](https://sequelize.org/)~~ (Do not provide a query builder API)

## Executing the Benchmark

Install the dependencies and run the benchmark:

```
npm install
npm start
```

## Results

> The results are from a MacBook Pro (M1, 2020) running Node.js v20.17.0

Simple query (`SELECT * FROM users WHERE id = 1`):

```
knex x 458,940 ops/sec ±1.46% (95 runs sampled)
kysely x 584,682 ops/sec ±2.95% (94 runs sampled)
drizzle x 50,211 ops/sec ±2.70% (93 runs sampled)
mikro-orm x 38,385 ops/sec ±6.62% (84 runs sampled)
typeorm x 760,456 ops/sec ±5.04% (89 runs sampled)
```

Inner join query (`SELECT * FROM users INNER JOIN accounts on users.id = accounts.user_id`):

```
knex x 311,164 ops/sec ±4.14% (92 runs sampled)
kysely x 377,329 ops/sec ±1.13% (95 runs sampled)
drizzle x 29,994 ops/sec ±0.98% (99 runs sampled)
mikro-orm x 75,958 ops/sec ±2.00% (86 runs sampled)
typeorm x 814,974 ops/sec ±1.02% (98 runs sampled)
```

Benchmarking innerJoin - select * from "users" inner join "accounts" on "users"."id" = "accounts"."user_id"

## Contribute

Help is very welcome to create more test scenarios for the query builders, or add more query builders to the comparison.