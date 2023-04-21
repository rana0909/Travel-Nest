const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {
    lat: String,
    lng: String,
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    building: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
  },
  { _id: false }
);

const ImageSchema = new Schema(
  {
    pictureUrl: String,
    thumbnailUrl: String,
  },
  { _id: false }
);

const HostSchema = new Schema(
  {
    name: String,
    id: Number,
    address: AddressSchema,
    contactNo: String,
    hostIdentityVerified: Boolean,
  },
  { _id: false }
);

PropertiesSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  propertyType: String,
  cancellationPolicy: String,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  price: Number,
  guestsIncluded: Number,
  space: String,
  notes: String,
  transit: String,
  access: String,
  interaction: String,
  rules: String,
  lastScraped: String,
  listingUrl: String,
  numberOfReviews: Number,
  rating: Number,
  amenities: [String],
  images: ImageSchema,
  hostInfo: HostSchema,
  location: LocationSchema,
  address: AddressSchema,
});

module.exports = mongoose.model("properties", PropertiesSchema);
