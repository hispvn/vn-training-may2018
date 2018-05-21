const { createKnex, generateData } = require("./helpers/utils");
const categories = ["A", "B", "C"];

const createTable = async db => {
  if (await db.schema.hasTable("table")) {
    return;
  }

  await db.schema
    .createTable("table", table => {
      table
        .string("id")
        .notNullable()
        .primary();

      table.enum("category", categories).notNullable();
      table.integer("value").notNullable();
    })
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });
};

(async () => {
  // const db = createKnex({ filename: "data.sqlite3" });
  const db = createKnex();
  await createTable(db);

  await db("table")
    .insert(generateData()[0])
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });

  console.time("batchInsert");

  await db.batchInsert("table", generateData(5000), 200).catch(err => {
    console.error(err);
    process.exit(-1);
  });

  console.timeEnd("batchInsert");

  console.time("grouping");

  const res = await db("table")
    .select("category")
    .count("value as count")
    .min("value as min")
    .max("value as max")
    .sum("value as sum")
    .avg("value as avg")
    .groupBy("category");

  console.timeEnd("grouping");

  console.log(res);

  await db.destroy();
})();
