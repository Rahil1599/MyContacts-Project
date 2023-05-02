const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//desc get all contacts
//Route  GET api/contacts/
//Access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts }); // get all contacts
});

//desc Get single contact
//Route  GET api/contacts/id
//Access Private
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact not found");
  }

  res.status(200).json(contact); //get single contact
});

//desc create contact
//Route POST api/contacts/
//Access Private
const createContact = asyncHandler(async (req, res) => {
  console.log("The body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact); //create contact
});

//desc Update contact
//Route  PUT api/contacts/id
//Access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});
//desc delete contact
//Route DELETE api/contacts/id
//Access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) { //check if the user is authorised
    res.status(403);
    throw new Error("User dont have permission to update this contact");
  }

  console.log("here", contact);
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
