/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);

    const collection = dao.findCollectionByNameOrId("users");

    const record = new Record(collection);
    record.setUsername("defaultAdmin");
    record.setPassword("admin123456789");

    dao.saveRecord(record);
  },
  (db) => {
    // optional revert
    const dao = new Dao(db);

    try {
      const record = dao.findAuthRecordByUsername("users", "defaultAdmin");

      dao.deleteRecord(record);
    } catch (_) {
      /* most likely already deleted */
    }
  },
);
