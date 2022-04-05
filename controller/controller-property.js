const HttpError = require("../models/http-error");
const Property = require("../models/model-property");

const getAllProperty = async (req, res, next) => {
  let property;
  try {
    property = await Property.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!property) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  if (property.length === 0) {
    const error = new HttpError("No Property Found , Please Add New.", 404);
    return next(error);
  }
  console.log(typeof property);
  res.json({ property: property });
};

const createProperty = async (req, res, next) => {
  const { title, description, size } = req.body;
  // console.log();
  if (!title || !description || !size) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const createdPlace = new Property({
    title,
    description,
    size,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const deleteProperty = async (req, res, next) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Property.findById(pid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Property Deleted Success.." });
};

// const updateProperty = async (req, res, next) => {

//   const { title, description,size } = req.body;
//   const pid = req.params.pid;

//   let property;
//   try {
//     property = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not update place.",
//       500
//     );
//     return next(error);
//   }

//   property.title = title;
//   property.description = description;
//   property.size = size

//   try {
//     await place.save();
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not update place.",
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ property: property });
// };

exports.getAllProperty = getAllProperty;
exports.createProperty = createProperty;
// exports.updateProperty = updateProperty;
exports.deleteProperty = deleteProperty;
