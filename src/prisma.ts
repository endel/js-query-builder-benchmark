import { PrismaClient } from "@prisma/client";

/**
 * Prisma does not have an API to get the SQL query string without executing it.
 * https://github.com/prisma/prisma/issues/5026
 */

const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query", },
  ],
});

let onQueryCB: Function;

prisma.$connect().then(() => {
  prisma.$on("query", (e: any) => {
    console.log("QUERY!", e.query)
    onQueryCB(e.query)
  });
});

export function simple(complete: Function) {
  onQueryCB = complete;
  prisma.user.findUnique({ where: { id: 1 } }).then(() => {});
}

export function innerJoin(complete: Function) {
  onQueryCB = complete;
  prisma.account.findMany({
    include: {
      user: true // Include related accounts
    }
  }).then(() => {});
}