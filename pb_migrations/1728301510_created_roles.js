/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8kdjowt4m25nuro",
    "created": "2024-10-07 11:45:10.519Z",
    "updated": "2024-10-07 11:45:10.519Z",
    "name": "roles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dqgm3fth",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8kdjowt4m25nuro");

  return dao.deleteCollection(collection);
})
