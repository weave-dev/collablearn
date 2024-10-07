/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nr5qqzr7hx3awzt",
    "created": "2024-10-07 10:08:23.244Z",
    "updated": "2024-10-07 10:08:23.244Z",
    "name": "users",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ipvyi11y",
        "name": "lrn",
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
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nr5qqzr7hx3awzt");

  return dao.deleteCollection(collection);
})
