const express = require("express");
const controllerProperty = require("../controller/controller-property");
const router = express.Router();

router.get("/", controllerProperty.getAllProperty);
router.post("/", controllerProperty.createProperty);
router.delete("/:pid", controllerProperty.deleteProperty);
// router.patch("/", controllerProperty.editProperty);

module.exports = router;
