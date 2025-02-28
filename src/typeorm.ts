import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})

const qb = AppDataSource.createQueryBuilder();;

export function simple() {
  return qb.clone().from("users").select("*").where("id = :id", { id: 1 }).getSql();
}

export function innerJoin() {
  return qb.clone().from("users").select("*").innerJoin("user", "u").where("u.id = a0.user_id").getSql();
}