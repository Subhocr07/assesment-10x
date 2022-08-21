const express = require("express");
const inventoryModel = require("../models/inventoryModels");
const router = express.Router();
const orderModel = require("../models/orderModel");

router.post("/order", (req, res) => {
  inventoryModel
    .find({ inventory_id: req.body.inventoryId })
    .then((items) => {
      if (items.length) {
        const available = items[0].available_quantity;
        if (available > req.body.quantity) {
          orderModel
            .create({
              customer_id: req.body.customerId,
              inventory_id: req.body.inventoryId,
              item_name: req.body.itemName,
              quantity: req.body.quantity,
            })
            .then(() => {
              const remainingQuantity = available - req.body.quantity;
              inventoryModel
                .updateOne(
                  { inventory_id: req.body.inventoryId },
                  { $set: { available_quantity: remainingQuantity } }
                )
                .then(() => {
                  res.status(200).send("ordered successfully");
                })
                .catch((err) => {
                  res.status(400).send(err);
                });
            })
            .catch((err) => {
              res.status(401).send(err);
            });
        } else {
          res.status(402).send("Out of Stock");
        }
      } else {
        res.status(403).send("item is not available");
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.get("/order_details", (req, res) => {
  orderModel
    .find()
    .then((orderList) => {
      res.status(200).send(orderList);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
