/// <reference path="bundle.d.ts" />

import assert = require('assert');
import r = require('rethinkdb');

const options: r.ConnectOptions = {
  host: 'localhost'
};

(async function () {
  const conn = await r.connect(options);
  const testDb = `test${Math.random().toString(36).substr(2)}`;

  try {
    const dbCreateResult = await r.dbCreate(testDb).run(conn);

    assert.equal(dbCreateResult.dbs_created, 1);

    conn.use(testDb);

    const tableCreateResult = await r.tableCreate('Test').run(conn);

    assert.equal(tableCreateResult.tables_created, 1);

    assert.deepEqual(await r.tableList().run(conn), ['Test']);

    const insertedNewId = await r.table('Test').insert({ hello: true }).run(conn);

    assert.ok(Array.isArray(insertedNewId.generated_keys));

    const insertedUseId = await r.table('Test').insert({ id: '123' }).run(conn);

    assert.ok(typeof insertedUseId.generated_keys === 'undefined');

    const result = await r.map([1, 2, 3], (v) => v.mul(10)).run(conn);

    assert.deepEqual(result, [10, 20, 30]);

    const tableDropResult = await r.tableDrop('Test').run(conn);

    assert.equal(tableDropResult.tables_dropped, 1);

    const dbDropResult = await r.dbDrop(testDb).run(conn);

    assert.equal(dbDropResult.dbs_dropped, 1);
  } catch (err) {
    console.log(err);

    process.exit(1);
  } finally {
    conn.close();
  }
})();
