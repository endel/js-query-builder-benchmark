import Benchmark from "benchmark";

import * as knex from "./knex.js";
import * as kysely from "./kysely.js";
import * as drizzle from "./drizzle.js";
// import * as prisma from "./prisma.js";
import * as mikroorm from "./mikro-orm.js";
import * as typeorm from "./typeorm.js";

const methods = Object.keys(knex);

async function run() {
  // setup dependencies
  await mikroorm.setup();

  // create benchmarks
  for (const method of methods) {
    console.log(`Benchmarking ${method} - ${knex[method]()}`);
    const suite = new Benchmark.Suite();
    suite
      .add('knex', () => knex[method]())
      .add('kysely', () => kysely[method]())
      .add('drizzle', () => drizzle[method]())
      .add('mikro-orm', () => mikroorm[method]())
      .add('typeorm', () => typeorm[method]())
      .on('cycle', (event) => console.log(String(event.target)))
      .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
      })
      .run();
  }

  process.exit();
}

// console.log(knex.simple());
// console.log(kysely.simple());
// console.log(drizzle.simple());
// console.log(mikroorm.simple());
// console.log(knex.innerJoin());

run();

// async function runPrisma () {
//   prisma.simple(function(query) { console.log("COMPLETE!", query); })
//   prisma.innerJoin(function(query) { console.log("COMPLETE!", query); })
// }
// runPrisma();


