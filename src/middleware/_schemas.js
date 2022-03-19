import Joi from "@hapi/joi";

const schemas = {};

const email = Joi.string()
  .trim()
  .lowercase()
  .email()
  .required()
  .label("Email is required and should look like this : example@email.com!");
const password = Joi.string()
  .min(3)
  .required()
  .label("Password is required,  it must have at least 5 letters");
const name = Joi.string()
  .min(3)
  .required()
  .label("Name is required,  it must have at least 5 letters");

const phone = Joi.string()
  .min(10)
  .required()
  .label("Phone is required,  it must have at least 10 digits");
const address = Joi.string()
  .min(3)
  .required()
  .label("Addrss is required,  it must have at least 3 letters");
const website = Joi.string()
  .min(5)
  .label("Website is required,  it must have at least 5 letters");

const speciality = Joi.string()
  .min(3)
  .required()
  .label("Speciality is required,  it must have at least 3 letters");

const clinic = Joi.string()
  .min(3)
  .required()
  .label("Clinic is required,  it must have at least 3 letters");

const image = Joi.string().min(5).label("Image is required,  it must be a url");

schemas.login = Joi.object().keys({
  email,
  password,
});
schemas.resetPassword = Joi.object().keys({
  userid: Joi.any().required().label("User id is required"),
  password,
});

schemas.pharmacy = Joi.object().keys({
  name,
  email,
  phone,
  address,
  website,
});

schemas.doctor = Joi.object().keys({
  name,
  email,
  phone,
  speciality,
  clinic,
  image,
});

export default schemas;
