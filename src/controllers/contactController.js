// contactController.js
const Contact = require("../models/contactModel");
const { sendEventToAll } = require("../sseManager");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addContact = async (req, res) => {
  const { name, number } = req.body;
  const userId = req.user.id;

  try {
    const newContact = new Contact({ name, number, userId });
    await newContact.save();
    sendEventToAll({ type: "ADD_CONTACT", payload: newContact });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, number },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    sendEventToAll({ type: "UPDATE_CONTACT", payload: updatedContact });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    sendEventToAll({
      type: "DELETE_CONTACT",
      payload: { id: deletedContact._id },
    });
    res.json({ id: deletedContact._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
