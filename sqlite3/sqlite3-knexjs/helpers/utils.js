const uuid = require("uuid/v4");
const categories = ["A", "B", "C"];

const generateData = (limit = 1) => {
  const data = [];

  for (let i = 0; i < limit; i++) {
    data.push({
      id: uuid(),
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.round(Math.random() * 1000)
    });
  }

  return data;
};

const createKnex = ({ filename } = { filename: ":memory:" }) => {
  const Dialect = require(`knex/lib/dialects/sqlite3/index.js`);
  Dialect.prototype._driver = () => require("sqlite3-bin");

  try {
    return require("knex")({
      client: Dialect,
      useNullAsDefault: true,
      debug: false,
      connection: {
        filename
      }
    });
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
};

module.exports = {
  generateData,
  createKnex
};
