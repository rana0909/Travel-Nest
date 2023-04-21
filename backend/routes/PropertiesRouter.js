const express = require("express");
const properties = require("./../models/properties");
const PropertiesRouter = express.Router();

const auth = require("./../middleware/auth");

PropertiesRouter.get("/api/properties", async (req, res) => {
  const propertiesList = await properties.find().exec();
  res.send(propertiesList);
});

PropertiesRouter.post("/api/properties", auth, async (req, res) => {
  try {
    const details = req.body;
    console.log(details);
    await properties.create(details);
    const property = await properties.find({ id: details.id }).exec();
    return res.send(property);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

PropertiesRouter.put("/api/properties", auth, async (req, res) => {
  const details = req.body;
  await properties.findOneAndUpdate({ id: details.id }, details);
  const property = await properties.find({ id: details.id }).exec();
  return res.send(property);
});

PropertiesRouter.delete("/api/properties", (req, res) => {
  const { propertyId } = req.body;
  properties.deleteOne({ id: propertyId }, (err) => {
    if (err) throw err;
    res.send("Deleted Successfully!");
  });
});

PropertiesRouter.put("/api/properties/rating", auth, async (req, res) => {
  const { id, rating } = req.body;
  //console.log(parseInt(id), rating);
  const property = await properties.findOne({ _id: id }).exec();
  //console.log(property);
  const { numberOfReviews, rating: currentRating } = property;
  const newNumberOfReviews = numberOfReviews + 1;
  const newRating =
    (currentRating * numberOfReviews + rating) / newNumberOfReviews;
  console.log(newRating.toFixed(1));
  await properties.findOneAndUpdate(
    { _id: id },
    { numberOfReviews: newNumberOfReviews, rating: newRating }
  );
  const updatedProperty = await properties.findOne({ _id: id }).exec();
  return res.send(updatedProperty);
});

module.exports = PropertiesRouter;
