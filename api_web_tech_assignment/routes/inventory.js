const express = require("express");
const router = express.Router();
const inventoryModel = require("../models/inventoryModels");

router.post("/inventory", (req, res) => {
  inventoryModel
    .find({ inventory_id: req.body.inventoryId })
    .then((items) => {
      if (items.length) {
        const quantity = items[0].available_quantity + req.body.quantity;
        inventoryModel
          .updateOne(
            { inventory_id: req.body.inventoryId },
            { $set: { available_quantity: quantity } }
          )
          .then((updatedData) => {
            res.status(200).send(`${updatedData} updated successfully`);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        inventoryModel
          .create({
            inventory_id: req.body.inventoryId,
            inventory_type: req.body.inventoryType,
            item_name: req.body.itemName,
            available_quantity: req.body.quantity,
          })
          .then((addedData) => {
            res.status(200).send(`${addedData} data added successfully`);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

router.get("/inventory_items", (req, res) => {
  inventoryModel
    .find()
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/inventory_items/:id", (req, res) => {
  inventoryModel
    .find({ inventory_type: req.params.id })
    .then((itemData) => {
      res.status(200).send(itemData);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
