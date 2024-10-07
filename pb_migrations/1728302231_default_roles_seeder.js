/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);

    const collection = dao.findCollectionByNameOrId("roles");

    const record = new Record(collection, { name: "admin" });

    dao.saveRecord(record);
  },
  (db) => {},
);
