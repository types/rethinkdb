/// <reference path="bundle.d.ts" />

import assert = require('assert');
import r = require('rethinkdb');

const options: r.ConnectOptions = {
  host: 'localhost'
};

(async function () {
  const conn = await r.connect(options);
  const testDb = `test${Math.random().toString(36).substr(2)}`;

  const dbCreateResult = await r.dbCreate(testDb).run(conn);

  assert.equal(dbCreateResult.dbs_created, 1);

  conn.use(testDb);

  const tableCreateResult = await r.tableCreate('Test').run(conn);

  assert.equal(tableCreateResult.tables_created, 1);

  assert.deepEqual(await r.tableList().run(conn), ['Test']);

  const tableDropResult = await r.tableDrop('Test').run(conn);

  assert.equal(tableDropResult.tables_dropped, 1);

  const dbDropResult = await r.dbDrop(testDb).run(conn);

  assert.equal(dbDropResult.dbs_dropped, 1);

  conn.close();
})();
