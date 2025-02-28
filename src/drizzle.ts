import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { QueryBuilder } from 'drizzle-orm/pg-core';

const db = drizzle(process.env.DATABASE_URL!);
const qb = new QueryBuilder();

const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

const accounts = pgTable("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => users.id),
  balance: integer().notNull(),
});

export function simple() {
  return qb.select().from(users).where(eq(users.id, 1)).toSQL().sql;
}

export function innerJoin() {
  return qb.select().from(users).innerJoin(accounts, eq(users.id, accounts.user_id)).toSQL().sql;
}