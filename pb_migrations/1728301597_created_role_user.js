/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zl8vg4ibt5ojtds",
    "created": "2024-10-07 11:46:37.373Z",
    "updated": "2024-10-07 11:46:37.373Z",
    "name": "role_user",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oe6o0tiv",
        "name": "role_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "8kdjowt4m25nuro",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "ldxmdxwy",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "nr5qqzr7hx3awzt",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("zl8vg4ibt5ojtds");

  return dao.deleteCollection(collection);
})
