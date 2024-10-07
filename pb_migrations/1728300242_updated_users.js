/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nr5qqzr7hx3awzt")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nr5qqzr7hx3awzt")

  collection.createRule = null

  return dao.saveCollection(collection)
})
