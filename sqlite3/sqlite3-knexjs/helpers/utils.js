const uuid = require("uuid/v4");

const generateData = (limit = 1) => {
  const categories = ["A", "B", "C"];
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

  return require("knex")({
    client: Dialect,
    useNullAsDefault: true,
    debug: false,
    connection: {
      filename
    }
  });
};

module.exports = {
  generateData,
  createKnex
};
